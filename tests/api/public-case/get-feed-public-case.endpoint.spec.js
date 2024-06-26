import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";

const publicCaseRoutes = "/api/public-case";

test.group(`GET /api/public-case`, () => {
  test(`Should return ${StatusCodes.OK} code when no query params are provided`, async ({
    client,
    expect,
  }) => {
    const response = await client.get(publicCaseRoutes).then((res) => res);
    expect(response.status()).toBe(StatusCodes.OK);
  });
});
