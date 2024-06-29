import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { createAnonymousCase } from "../../utils/anonymous-case.js";
import { hasError } from "../../utils/has-error.js";

export const anonymousCaseRoute = "/api/anonymous-case";

const validPayload = {
  description: "This is a test description",
  latitude: 14.656_96,
  longitude: -90.566_51,
  city: "Guatemala City",
  country: "Guatemala",
  address: "1st Avenue",
};

test.group(
  `POST /api/anonymous-case Should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test("request body is empty", async ({ client, expect }) => {
      const response = await client
        .post(anonymousCaseRoute)
        .json({})
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
    });

    for (const key of Object.keys(validPayload)) {
      test(`${key} is missing`, async ({ client, expect }) => {
        const response = await client
          .post(anonymousCaseRoute)
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
  `POST /api/anonymous-case Should return ${StatusCodes.CREATED} code when `,
  () => {
    test(`a valid payload is provided`, async ({ client, expect }) => {
      const response = await client
        .post(anonymousCaseRoute)
        .json(validPayload)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CREATED);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    });

    test(`is follow up case`, async ({ client, expect }) => {
      const anonymousCase = await createAnonymousCase();

      const response = await client
        .post(anonymousCaseRoute)
        .json({ ...validPayload, key: anonymousCase.key })
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CREATED);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    });
  },
);
