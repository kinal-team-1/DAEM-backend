import "@japa/expect";
import "@japa/api-client";
import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import { hasError } from "../../utils/has-error.js";
import { createContribution } from "../../utils/contribution-case.js";

const contributionRoutes = "/api/contribution";

test.group(
  `DELETE api/contribution/:id should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test("id is not a valid mongo id", async ({ client, expect }) => {
      const response = await client
        .delete(`${contributionRoutes}/invalid-mongo-id`)
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
  `DELETE api/contribution/:id should return ${StatusCodes.NOT_FOUND} code when`,
  () => {
    test("contribution not found", async ({ client, expect }) => {
      const response = await client
        .delete(`${contributionRoutes}/5f9d1b3b5f3b9b001f3b9b00`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.NOT_FOUND);
      expect(response.body().errors).not.toBeDefined();
    });
  },
);

test.group(
  `DELETE api/contribution/:id should return ${StatusCodes.OK} code when`,
  () => {
    test("contribution is found", async ({ client, expect }) => {
      const contribution = await createContribution();

      const response = await client
        .delete(`${contributionRoutes}/${contribution._id}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    });
  },
);
