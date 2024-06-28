import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import "@japa/expect";
import "@japa/api-client";
import { hasError } from "../../utils/has-error.js";
import {
  createUser,
  deleteUserById,
  getRandomUser,
  getRandomUsers,
} from "../../utils/user.js";

const validPayload = {
  username: "XxX_Jhondoe_XxX",
  email: "jhondoe@email.com",
  password: "Pa$$w0rd",
  name: "John",
  lastname: "Doe",
};

const authSignupRoute = "/api/auth/signup";

test.group(
  `POST /api/auth/signup Should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    for (const key of Object.keys(validPayload)) {
      const invalidPayload = { ...validPayload };
      delete invalidPayload[key];

      test(`"${key}" is missing`, async ({ client, expect }) => {
        const response = await client
          .post(authSignupRoute)
          .json(invalidPayload)
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

    test("email is invalid", async ({ client, expect }, { email }) => {
      const response = await client
        .post(authSignupRoute)
        .json({ ...validPayload, email })
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["body"],
          fields: ["email"],
        }),
      ).toBe(true);
    }).with([
      { email: "invalid" },
      { email: "invalid@" },
      { email: "invalid@domain" },
      { email: "invalid@domain." },
      { email: "invalid@domain.c" },
    ]);

    test("password is invalid", async ({ client, expect }, { password }) => {
      const response = await client
        .post(authSignupRoute)
        .json({ ...validPayload, password })
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["body"],
          fields: ["password"],
        }),
      ).toBe(true);
    }).with([
      { password: "invalid" },
      { password: "invalidpassword" },
      { password: "" },
      { password: "12345678" },
    ]);

    for (const key of ["name", "lastname", "username"]) {
      test(`${key}'s length is less than 3 characters`, async ({
        client,
        expect,
      }, dataset) => {
        const response = await client
          .post(authSignupRoute)
          .json({ ...validPayload, [`${key}`]: dataset[`${key}`] })
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
      }).with([
        { [`${key}`]: "" },
        { [`${key}`]: "x" },
        { [`${key}`]: 23_400 },
      ]);
    }
  },
);

test.group(
  `POST /api/auth/signup Should return ${StatusCodes.CREATED} code when `,
  () => {
    test("valid payload is provided", async ({ client, expect }) => {
      const response = await client
        .post(authSignupRoute)
        .json(validPayload)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CREATED);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    });

    test("after deleting a user and creating it again", async ({
      client,
      expect,
    }, user) => {
      const createdUser = await createUser(user);
      await deleteUserById(createdUser._id);

      const response = await client
        .post(authSignupRoute)
        .json(user)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CREATED);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    }).with(getRandomUsers(3));
  },
);

test.group(
  `POST /api/auth/signup Should return ${StatusCodes.CONFLICT} code when `,
  () => {
    test("email already taken", async ({ client, expect }, user) => {
      await createUser({ ...getRandomUser(), email: user.email });

      const response = await client
        .post(authSignupRoute)
        .json(user)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CONFLICT);
    }).with(getRandomUsers(3));

    test("username already taken", async ({ client, expect }, user) => {
      await createUser({ ...getRandomUser(), username: user.username });

      const response = await client
        .post(authSignupRoute)
        .json(user)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.CONFLICT);
    }).with(getRandomUsers(3));
  },
);
