import "@japa/expect";
import "@japa/api-client";
import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import { createUser } from "../../utils/user.js";
import {
  createCase,
  createContribution,
  getRandomContributions,
} from "../../utils/contribution-case.js";

const contributionRoute = "/api/contribution";

test.group(
  `GET /api/contribution should return ${StatusCodes.OK} code when`,
  () => {
    test(`no query params are provided`, async ({ client, expect }) => {
      // Crear datos de prueba: usuario y caso
      const user = await createUser();
      const contribution = await createCase({ user_id: user._id });

      // Crear contribuciones asociadas
      const contributions = getRandomContributions(
        10,
        contribution._id,
        user._id,
      );
      await Promise.all(contributions.map({ createContribution }));

      const response = await client.get(contributionRoute).then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
      expect(response.body().data.length).toBe(10); // Verifica la cantidad total
    });

    test(`with limit query param`, async ({ client, expect }) => {
      const user = await createUser();
      const contributionCase = await createCase({ user_id: user._id });

      const contributions = getRandomContributions(
        10,
        contributionCase._id,
        user._id,
      );
      await Promise.all(contributions.map({ createContribution }));

      const response = await client
        .get(`${contributionRoute}?limit=5`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
      expect(response.body().data.length).toBe(5); // Verifica que el límite se respete
    });

    test(`with page query param`, async ({ client, expect }) => {
      const user = await createUser();
      const contributionCase = await createCase({ user_id: user._id });

      const contributions = getRandomContributions(
        20,
        contributionCase._id,
        user._id,
      );
      await Promise.all(contributions.map({ createContribution }));

      const response = await client
        .get(`${contributionRoute}?page=2&limit=10`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().message).toBeDefined();
      expect(response.body().data).toBeDefined();
      expect(response.body().data.length).toBe(10); // Verifica que la página devuelva el número correcto de resultados
    });
  },
);

test.group(
  `GET /api/contribution should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test(`invalid limit query param`, async ({ client, expect }) => {
      const response = await client
        .get(`${contributionRoute}?limit=invalid`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBeGreaterThan(0); // Verifica que se maneje un error
    });

    test(`invalid page query param`, async ({ client, expect }) => {
      const response = await client
        .get(`${contributionRoute}?page=invalid`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBeGreaterThan(0); // Verifica que se maneje un error
    });
  },
);
