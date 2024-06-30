import { StatusCodes } from "http-status-codes";
import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";
import { createSignedUploadUrl } from "../../utils/attachment.js";
import { supabaseClient } from "../../../src/utils/supabase-client.js";
import { createSandbox } from "sinon";
import { hasError } from "../../utils/has-error.js";

test.group(
  `DELETE /api/attachment/ Should return ${StatusCodes.OK} code when`,
  (group) => {
    group.setup(async () => {
      const sandbox = createSandbox();
      sandbox
        .stub(supabaseClient, "createSignedUploadUrl")
        .callsFake(async () => {
          return {
            data: {
              signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
            },
          };
        });

      sandbox
        .stub(supabaseClient, "remove")
        .callsFake(() => Promise.resolve({}));

      return () => {
        sandbox.restore();
      };
    });

    test("The attachment is removed", async ({ client, expect }) => {
      const filepaths = ["hola.jpg"];

      // creates stale content
      await createSignedUploadUrl(filepaths);

      const response = await client
        .delete("/api/attachment/")
        .json({ filepaths })
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
    });
  },
);

test.group(
  `DELETE /api/attachment/ Should return ${StatusCodes.NOT_FOUND} code when`,
  (group) => {
    group.setup(async () => {
      const sandbox = createSandbox();
      sandbox
        .stub(supabaseClient, "createSignedUploadUrl")
        .callsFake(async () => {
          return {
            data: {
              signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
            },
          };
        });

      sandbox
        .stub(supabaseClient, "remove")
        .callsFake(() => Promise.resolve({}));

      return () => {
        sandbox.restore();
      };
    });

    test("some stale content doesnt exist", async ({ client, expect }) => {
      const filepaths = ["hola.jpg", "some-file.jpg"];

      // creates stale content
      await createSignedUploadUrl([filepaths[0]]);

      const response = await client
        .delete("/api/attachment/")
        .json({ filepaths })
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.NOT_FOUND);
      expect(response.body().message).toBeDefined();
    });
  },
);

test.group(
  `DELETE /api/attachment/ Should return ${StatusCodes.BAD_REQUEST} code when`,
  (group) => {
    group.setup(async () => {
      const sandbox = createSandbox();
      sandbox
        .stub(supabaseClient, "createSignedUploadUrl")
        .callsFake(async () => {
          return {
            data: {
              signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
            },
          };
        });

      sandbox
        .stub(supabaseClient, "remove")
        .callsFake(() => Promise.resolve({}));

      return () => {
        sandbox.restore();
      };
    });

    test("some stale content doesnt exist", async ({ client, expect }) => {
      const response = await client
        .delete("/api/attachment/")
        .json()
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors).toHaveLength(1);
      expect(
        hasError({
          body: response.body(),
          fields: ["filepaths"],
          locations: ["body"],
        }),
      );
    });
  },
);
