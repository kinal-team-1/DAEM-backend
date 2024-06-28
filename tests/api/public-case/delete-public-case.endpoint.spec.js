import "@japa/expect";
import "@japa/api-client";
import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import { hasError } from "../../utils/has-error.js";

const publicCaseRoutes = "/api/public-case";

test.group(
  `DELETE api/public-case/:id should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test("id is not a valid mongo id", async ({ client, expect }) => {
      const response = await client
        .delete(`${publicCaseRoutes}/invalid-mongo-id`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["params"],
          fields: ["id"],
        }),
      ).toBe(true);
    });
  },
);

test.group(
  `DELETE api/public-case/:id should return ${StatusCodes.NOT_FOUND} code when`,
  () => {
    test("public case not found", async ({ client, expect }) => {
      const response = await client
        .delete(`${publicCaseRoutes}/5f9d1b3b5f3b9b001f3b9b00`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.NOT_FOUND);
      expect(response.body().errors).not.toBeDefined();
    });
  },
);

test.group(
  `DELETE api/public-case/:id should return ${StatusCodes.OK} code when`,
  () => {
    test("public case is found");
  },
);
