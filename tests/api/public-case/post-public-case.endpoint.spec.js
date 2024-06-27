import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";

const publicCaseRoute = "/api/public-case";

test.group(
  `POST api/public-case should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
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
        expect(
          response.body().errors.some((msg) => msg.includes(`body[${key}]`)),
        ).toBe(true);
      });
    }
  },
);
