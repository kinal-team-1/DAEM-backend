import "@japa/expect";
import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/api-client";
import { hasError } from "../../utils/has-error.js";

test.group(
  `POST /api/auth/login should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test(`email or username is not valid`, async ({ client, expect }, data) => {
      const response = await client
        .post("/api/auth/login")
        .json(data)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);

      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["body"],
          fields: ["email", "username"],
        }),
      ).toBe(true);
    }).with([
      { email: "", password: "Pa$$word123" },
      { email: "test@", password: "Pa$$word123" },
      { email: "test.com", password: "Pa$$word123" },
      { username: "", password: "Pa$$word123" },
      { username: "tx", password: "Pa$$word123" },
    ]);

    test("password is not valid", async ({ client, expect }, data) => {
      const response = await client
        .post("/api/auth/login")
        .json(data)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["body"],
          fields: ["password"],
        }),
      ).toBeTruthy();
    }).with([
      { email: "test@email.com", password: "password" },
      { email: "test@email.com", password: "Password" },
      { email: "test@email.com", password: "1Pass" },
    ]);
  },
);
