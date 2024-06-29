import "@japa/expect";
import "@japa/api-client";
import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import { createUser, getRandomUsers } from "../../utils/user.js";

test.group(`GET /api/user Should return ${StatusCodes.OK} code when`, () => {
  test("there are no users", async ({ client, expect }) => {
    const response = await client.get("/api/user").then((res) => res);

    expect(response.status()).toBe(StatusCodes.OK);
    expect(response.body().data).toHaveLength(0);
  });

  for (const { users, page, limit, expected } of [
    { users: getRandomUsers(3), page: 1, limit: undefined, expected: 3 },
    { users: getRandomUsers(5), page: 1, limit: 2, expected: 2 },
    { users: getRandomUsers(11), page: 3, limit: 5, expected: 1 },
    { users: getRandomUsers(8), page: 3, limit: 3, expected: 2 },
  ]) {
    test(`there are ${users.length} users and expects to retrieve ${expected}. {limit: ${limit}, page: ${page}}`, async ({
      client,
      expect,
    }) => {
      await Promise.all(users.map((u) => createUser(u)));

      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("page", page);
      if (limit) urlSearchParams.append("limit", limit);

      const response = await client
        .get(`/api/user?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toHaveLength(expected);
    });
  }
});
