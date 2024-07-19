import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import { hasError } from "../../utils/has-error.js";
import { createUser } from "../../utils/user.js";
import { createPublicCase } from "../../utils/public-case.js";
import {
  createContribution,
  getRandomContributions,
} from "../../utils/contribution-case.js";

const contributionRoute = "/api/contribution";

test.group(
  `GET /api/contribution should return ${StatusCodes.OK} code when`,
  () => {
    test(`no query params are provided`, async ({ client, expect }) => {
      const response = await client.get(contributionRoute).then((res) => res);
      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    });

    test(`valid user_id query param is provided`, async ({
      client,
      expect,
    }) => {
      const user = await createUser();
      const response = await client
        .get(`${contributionRoute}?user_id=${user._id}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    });

    test(`valid case_id query param is provided`, async ({
      client,
      expect,
    }) => {
      const publicCase = await createPublicCase();
      const response = await client
        .get(`${contributionRoute}?case_id=${publicCase._id}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    });

    for (const { userId, caseId, contributions, expectedLength } of [
      {
        contributions: getRandomContributions(5),
        userId: "507f1f77bcf86cd799439011", // example Mongo ID
        caseId: "507f1f77bcf86cd799439012", // example Mongo ID
        expectedLength: 3,
      },
      {
        contributions: getRandomContributions(8),
        userId: "507f1f77bcf86cd799439011",
        caseId: "507f1f77bcf86cd799439012",
        expectedLength: 2,
      },
    ]) {
      test(`should return contributions for given user_id or case_id`, async ({
        client,
        expect,
      }) => {
        await Promise.all(
          contributions.map((c) =>
            createContribution({ ...c, user_id: userId, case_id: caseId }),
          ),
        );

        const responseByUser = await client
          .get(`${contributionRoute}?user_id=${userId}`)
          .then((res) => res);

        const responseByCase = await client
          .get(`${contributionRoute}?case_id=${caseId}`)
          .then((res) => res);

        expect(responseByUser.status()).toBe(StatusCodes.OK);
        expect(responseByUser.body().message).toBeDefined();
        expect(responseByUser.body().data.length).toBe(expectedLength);

        expect(responseByCase.status()).toBe(StatusCodes.OK);
        expect(responseByCase.body().message).toBeDefined();
        expect(responseByCase.body().data.length).toBe(expectedLength);
      });
    }
  },
);

test.group(
  `GET /api/contribution should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test(`user_id query param is missing`, async ({ client, expect }) => {
      const response = await client
        .get(`${contributionRoute}?case_id=507f1f77bcf86cd799439012`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["query"],
          fields: ["user_id"],
        }),
      ).toBeTruthy();
    });

    test(`case_id query param is missing`, async ({ client, expect }) => {
      const response = await client
        .get(`${contributionRoute}?user_id=507f1f77bcf86cd799439011`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["query"],
          fields: ["case_id"],
        }),
      ).toBeTruthy();
    });
  },
);
