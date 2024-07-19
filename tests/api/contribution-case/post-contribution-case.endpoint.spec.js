import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { hasError } from "../../utils/has-error.js";
import { createUser } from "../../utils/user.js";
import { createPublicCase } from "../../utils/public-case.js";

const contributionRoute = "/api/contribution";

// Payload de prueba con valores válidos
const validPayload = {
  user_id: "",
  case_id: "",
  content: "Content case",
};

test.group(
  `POST ${contributionRoute} should return ${StatusCodes.BAD_REQUEST} code when`,
  () => {
    test("request body is empty", async ({ client, expect }) => {
      const response = await client
        .post(contributionRoute)
        .json({})
        .then((res) => res);

      response.dumpBody();
      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors).toBeDefined(); // Verifica que haya errores en el cuerpo
    }).pin();
    for (const key of Object.keys(validPayload)) {
      test(`${key} is missing`, async ({ client, expect }) => {
        const response = await client
          .post(contributionRoute)
          .json({ ...validPayload, [key]: undefined })
          .then((res) => res);

        expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body().errors.length).toBeGreaterThan(0); // Verifica que haya al menos un error
        expect(
          hasError({
            body: response.body(),
            locations: ["body"],
            fields: [key],
          }),
        ).toBe(true);
      }).pin();
    }
  },
);

test.group(
  `POST ${contributionRoute} should return ${StatusCodes.CREATED} code`,
  () => {
    test("when request body is valid", async ({ client, expect }) => {
      const user = createUser();
      const publicCase = createPublicCase({ submitter: user._id });
      const response = await client
        .post(contributionRoute)
        .json({ ...validPayload, case_id: publicCase._id, user_id: user._id })
        .then((res) => res);

      // Verifica que la respuesta tenga el estado esperado y los datos correctos
      expect(response.status()).toBe(StatusCodes.CREATED);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    }).pin();
  },
);
