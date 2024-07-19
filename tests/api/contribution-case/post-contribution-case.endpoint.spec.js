import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { hasError } from "../../utils/has-error.js";

const contributionRoute = "/api/contribution";

const validPayload = {
  user_id: "507f1f77bcf86cd799439011",
  case_id: "507f1f77bcf86cd799439012",
  content: "Contribution Content",
  attachment: "507f1f77bcf86cd799439013",
  tp_status: true,
};

test.group(
  `POST api/contribution should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test("request body is empty", async ({ client, expect }) => {
      const response = await client
        .post(contributionRoute)
        .json({})
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
    });

    for (const key of Object.keys(validPayload)) {
      test(`${key} is missing`, async ({ client, expect }) => {
        const response = await client
          .post(contributionRoute)
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
  `POST api/contribution should return ${StatusCodes.CREATED} code`,
  () => {
    test("when request body is valid", async ({ client, expect }) => {
      const response = await client
        .post(contributionRoute)
        .json(validPayload)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CREATED);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    });
  },
);
