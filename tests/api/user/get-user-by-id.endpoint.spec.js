import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { createUser } from "../../utils/create-user.js";

test.group(
  `GET /api/user/:id should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test("id is not a valid mongo id", async ({ client, expect }, userId) => {
      const response = await client
        .get(`/api/user/${userId}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      // eslint-disable-next-line unicorn/no-null
    }).with(["userId", "1234567890", true, undefined, Number.NaN, null]);
  },
);

test.group(
  `GET /api/user/:id should return ${StatusCodes.NOT_FOUND} code when `,
  () => {
    test("user not found", async ({ client, expect }) => {
      const response = await client
        .get("/api/user/60b5e4f1c9e77f001f9f1b4a")
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });
  },
);

test.group(
  `GET /api/user/:id should return ${StatusCodes.OK} code when `,
  () => {
    test("user found", async ({ client, expect }) => {
      const user = await createUser();

      const response = await client
        .get(`/api/user/${user._id}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
      expect(response.body().data._id).toBe(user._id);
    });
  },
);
