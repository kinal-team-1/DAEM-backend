import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { hasError } from "../../utils/has-error.js";
import { createUser } from "../../utils/create-user.js";

const publicCaseRoute = "/api/public-case";

const validPayload = {
  title: "Case Title",
  description: "Case Description 20 chars",
  // mongo id
  submitter: "5f9d1b3b5f3b9b001f3b9b00",

  // location props
  latitude: 1,
  longitude: 1,
  // lorem10
  address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  city: "City",
  country: "Country",
};

test.group(
  `POST api/public-case should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test("request body is empty", async ({ client, expect }) => {
      const response = await client
        .post(publicCaseRoute)
        .json({})
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
    });

    for (const key of Object.keys(validPayload)) {
      test(`${key} is missing`, async ({ client, expect }) => {
        const response = await client
          .post(publicCaseRoute)
          .json({ ...validPayload, [key]: undefined })
          .then((res) => res);

        expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body().errors.length).toBe(1);
        expect(
          hasError({
            body: response.body(),
            locations: ["body"],
            fields: [key],
          }),
        ).toBe(true);
      });
    }
  },
);

test.group(
  `POST api/public-case should return ${StatusCodes.CREATED} code`,
  () => {
    for (let i = 0; i < 5; i++) {
      test("when request body is valid", async ({ client, expect }) => {
        const user = await createUser();

        const response = await client
          .post(publicCaseRoute)
          .json({ ...validPayload, submitter: user._id })
          .then((res) => res);

        expect(response.status()).toBe(StatusCodes.CREATED);
        expect(response.body().data).toBeDefined();
        expect(response.body().message).toBeDefined();
        expect(response.body().data.submitter).toBe(user._id);
      });
    }
  },
);
