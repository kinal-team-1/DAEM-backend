import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";

const publicCaseRoutes = "/api/public-case";

test.group(
  `GET /api/public-case Should return ${StatusCodes.OK} code when `,
  () => {
    test(`no query params are provided`, async ({ client, expect }) => {
      const response = await client.get(publicCaseRoutes).then((res) => res);
      expect(response.status()).toBe(StatusCodes.OK);
    });

    test(`lat and long query params are provided`, async ({
      client,
      expect,
    }) => {
      const response = await client
        .get(`${publicCaseRoutes}?lat=14.65696&long=-90.56651`)
        .then((res) => res);
      expect(response.status()).toBe(StatusCodes.OK);
    });

    test(`lat, long and radius query params are provided`, async ({
      client,
      expect,
    }) => {
      const response = await client
        .get(`${publicCaseRoutes}?lat=14.65696&long=-90.56651&radius=10`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
    });
  },
);

test.group(
  `GET /api/public-case Should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test(`lat query param is missing`, async ({ client, expect }) => {
      const response = await client
        .get(`${publicCaseRoutes}?long=-90.56651`)
        .then((res) => res);
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
    });

    test(`long query param is missing`, async ({ client, expect }) => {
      const response = await client
        .get(`${publicCaseRoutes}?lat=14.65696`)
        .then((res) => res);
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
    });
  },
);
