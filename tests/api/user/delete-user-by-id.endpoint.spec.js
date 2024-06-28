import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { hasError } from "../../utils/has-error.js";
import { createUser } from "../../utils/user.js";

test.group(
  `DELETE /api/user/:id Should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test("id is invalid", async ({ client, expect }, id) => {
      const response = await client
        .delete(`/api/user/${id}`)
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
    }).with(["invalid", true, Number.NaN]);
  },
);

test.group(
  `DELETE /api/user/:id Should return ${StatusCodes.NOT_FOUND} code when `,
  () => {
    test("user does not exist", async ({ client, expect }) => {
      const response = await client
        .delete(`/api/user/60c4e9b5e7f5c4c8f7c4f3c1`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });
  },
);

test.group(
  `DELETE /api/user/:id Should return ${StatusCodes.OK} code when `,
  () => {
    test("user is deleted", async ({ client, expect }) => {
      const user = await createUser();

      const response = await client
        .delete(`/api/user/${user._id}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
    });
  },
);
