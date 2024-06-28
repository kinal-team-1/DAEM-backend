import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import { hasError } from "../../utils/has-error.js";

const publicCaseRoutes = "/api/public-case";

test.group(
  `GET /api/public-case Should return ${StatusCodes.OK} code when `,
  () => {
    test(`no query params are provided`, async ({ client, expect }) => {
      const response = await client.get(publicCaseRoutes).then((res) => res);
      expect(response.status()).toBe(StatusCodes.OK);
    });

    test(`valid lat and long query params are provided`, async ({
      client,
      expect,
    }, { lat, long }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("lat", lat);
      urlSearchParams.append("long", long);

      const response = await client
        .get(`${publicCaseRoutes}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
    }).with([
      { lat: 14.656_96, long: -90.566_51 },
      { lat: -11.123_45, long: 12.345_67 },
      // more random coordinates
    ]);

    test(`lat, long and radius query params are provided`, async ({
      client,
      expect,
    }, { lat, long, radius }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("lat", lat);
      urlSearchParams.append("long", long);
      urlSearchParams.append("radius", radius);

      const response = await client
        .get(`${publicCaseRoutes}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
    }).with([
      { lat: 14.656_96, long: -90.566_51, radius: 10 },
      { lat: -11.123_45, long: 12.345_67, radius: 27 },
      // more random coordinates
    ]);
  },
);

test.group(
  `GET /api/public-case Should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test(`lat query param is missing`, async ({ client, expect }, { long }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("long", long);

      const response = await client
        .get(`${publicCaseRoutes}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["query"],
          fields: ["lat"],
        }),
      ).toBeTruthy();
    }).with([{ long: -90.566_51 }, { long: 12.345_67 }]);

    test(`long query param is missing`, async ({ client, expect }, { lat }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("lat", lat);

      const response = await client
        .get(`${publicCaseRoutes}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["query"],
          fields: ["long"],
        }),
      ).toBeTruthy();
    }).with([{ lat: 14.656_96 }, { lat: -11.123_45 }]);
    // when the radius is a float
    test(`radius query param is not an integer`, async ({ client, expect }, {
      lat,
      long,
      radius,
    }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("lat", lat);
      urlSearchParams.append("long", long);
      urlSearchParams.append("radius", radius);

      const response = await client
        .get(`${publicCaseRoutes}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["query"],
          fields: ["radius"],
        }),
      ).toBeTruthy();
    }).with([
      { lat: 14.656_96, long: -90.566_51, radius: 10.5 },
      { lat: -11.123_45, long: 12.345_67, radius: 27.2 },
      { lat: -11.123_45, long: 12.345_67, radius: true },
    ]);
  },
);
