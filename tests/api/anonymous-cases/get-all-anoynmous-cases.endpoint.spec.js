import { test } from "@japa/runner";

import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { hasError } from "../../utils/has-error.js";
import {
  createAnonymousCase,
  getRandomAnonymousCases,
} from "../../utils/anonymous-case.js";

const anonymousCaseRoute = "/api/anonymous-case";

test.group(
  `GET /api/anonymous-case Should return ${StatusCodes.OK} code when `,
  () => {
    test(`no query params are provided`, async ({ client, expect }) => {
      const response = await client.get(anonymousCaseRoute).then((res) => res);
      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    });

    test(`valid lat and long query params are provided`, async ({
      client,
      expect,
    }, { lat, long }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("lat", lat);
      urlSearchParams.append("long", long);

      const response = await client
        .get(`${anonymousCaseRoute}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
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
        .get(`${anonymousCaseRoute}?${urlSearchParams.toString()}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
    }).with([
      { lat: 14.656_96, long: -90.566_51, radius: 10 },
      { lat: -11.123_45, long: 12.345_67, radius: 27 },
      // more random coordinates
    ]);

    for (const {
      lat,
      long,
      radius,
      anonymousCases,
      expectedLength,
      params,
    } of [
      {
        anonymousCases: getRandomAnonymousCases(5),
        lat: 14.655_934_6,
        long: -90.565_942_9,
        radius: 1,
        expectedLength: 3,
      },
      {
        anonymousCases: getRandomAnonymousCases(8),
        lat: -11.123_45,
        long: 12.345_67,
        radius: 10,
        expectedLength: 2,
        params: { page: 1, limit: 2 },
      },
    ]) {
      test("should return just the public cases that are within the radius", async ({
        client,
        expect,
      }) => {
        const listAnonymous = anonymousCases.map((p, i) => {
          return {
            ...p,
            // 0.001 is approximately 111 meters
            latitude: lat + 0.0021 * (i + 1),
            //   0.001 is approximately 111 meters
            longitude: long + 0.0021 * (i + 1), // if I want only 3 cases to be returned
          };
        });

        await Promise.all(listAnonymous.map((p) => createAnonymousCase(p)));

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append("lat", lat);
        urlSearchParams.append("long", long);
        urlSearchParams.append("radius", radius);
        if (params) {
          urlSearchParams.append("page", params.page);
          urlSearchParams.append("limit", params.limit);
        }

        const response = await client
          .get(`${anonymousCaseRoute}?${urlSearchParams.toString()}`)
          .then((res) => res);

        expect(response.status()).toBe(StatusCodes.OK);
        expect(response.body().message).toBeDefined();
        expect(response.body().data).toBeDefined();
        expect(response.body().data.length).toBe(expectedLength);
      });
    }
  },
);

test.group(
  `GET /api/anonymous-case Should return ${StatusCodes.BAD_REQUEST} code when `,
  () => {
    test(`lat query param is missing`, async ({ client, expect }, { long }) => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("long", long);

      const response = await client
        .get(`${anonymousCaseRoute}?${urlSearchParams.toString()}`)
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
        .get(`${anonymousCaseRoute}?${urlSearchParams.toString()}`)
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
        .get(`${anonymousCaseRoute}?${urlSearchParams.toString()}`)
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
