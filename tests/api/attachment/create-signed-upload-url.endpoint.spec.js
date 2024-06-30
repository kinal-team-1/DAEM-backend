import "@japa/expect";
import "@japa/api-client";
import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import { supabaseClient } from "../../../src/utils/supabase-client.js";
import { stub } from "sinon";
import { hasError } from "../../utils/has-error.js";

test.group(
  `POST api/attachment/upload Should return ${StatusCodes.BAD_REQUEST} code when`,
  (group) => {
    group.setup(async () => {
      const bucket = stub(supabaseClient, "createSignedUploadUrl").callsFake(
        async () => {
          return {
            data: {
              signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
            },
          };
        },
      );

      return () => {
        bucket.restore();
      };
    });

    test(`filepath is not provided`, async ({ client, expect }) => {
      const response = await client
        .post("/api/attachment/upload")
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body().errors.length).toBe(1);
      expect(
        hasError({
          body: response.body(),
          locations: ["body"],
          fields: ["filepath"],
        }),
      );
    });
  },
);

test.group(
  `POST api/attachment/upload Should return ${StatusCodes.OK} code when `,
  (group) => {
    group.setup(async () => {
      const bucket = stub(supabaseClient, "createSignedUploadUrl").callsFake(
        async () => {
          return {
            data: {
              signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
            },
          };
        },
      );

      return () => {
        bucket.restore();
      };
    });

    test("the request is valid", async ({ client, expect }) => {
      const response = await client
        .post("/api/attachment/upload")
        .json({
          filepath: "test.txt",
        })
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toBeDefined();
      expect(response.body().message).toBeDefined();
      // check stub is working
      expect(
        response.body().data.startsWith("https://example.com/"),
      ).toBeTruthy();
    });
  },
);
