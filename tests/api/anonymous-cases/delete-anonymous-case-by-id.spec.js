import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import { hasError } from "../../utils/has-error.js";
import "@japa/expect";
import "@japa/api-client";
import { createAnonymousCase } from "../../utils/anonymous-case.js";

const anonymousCaseRoute = "/api/anonymous-case";

test.group(
  `DELETE api/anonymous-case/:id should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test("id is not a valid mongo id", async ({ client, expect }) => {
      const response = await client
        .delete(`${anonymousCaseRoute}/invalid-mongo-id`)
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
  `DELETE api/anonymous-case/:id should return ${StatusCodes.NOT_FOUND} code when`,
  () => {
    test("anonymous case not found", async ({ client, expect }) => {
      const response = await client
        .delete(`${anonymousCaseRoute}/5f9d1b3b5f3b9b001f3b9b00`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.NOT_FOUND);
      expect(response.body().errors).not.toBeDefined();
    });
  },
);

test.group(
  `DELETE api/anonymous-case/:id should return ${StatusCodes.OK} code when`,
  () => {
    test("anonymous case is found", async ({ client, expect }) => {
      const anonymousCase = await createAnonymousCase();

      const response = await client
        .delete(`${anonymousCaseRoute}/${anonymousCase._id}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    });
  },
);
