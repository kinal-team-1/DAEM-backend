import "@japa/expect";
import "@japa/api-client";
import { test } from "@japa/runner";
import { StatusCodes } from "http-status-codes";
import { createSandbox } from "sinon";
import { supabaseClient } from "../../../src/utils/supabase-client.js";
import {
  createPublicCase,
  getRandomPublicCases,
} from "../../utils/public-case.js";
import { createSignedUploadUrl } from "../../utils/attachment.js";

test.group(
  `POST api/attachment/:id Should return ${StatusCodes.OK} code when `,
  (group) => {
    group.setup(async () => {
      const sandbox = createSandbox();

      sandbox
        .stub(supabaseClient, "createSignedUrls")
        .callsFake(async (filepaths) => {
          const signedUrls = filepaths.map(() => ({
            signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
          }));

          return {
            data: signedUrls,
          };
        });

      sandbox
        .stub(supabaseClient, "createSignedUploadUrl")
        .callsFake(async () => {
          return {
            data: {
              signedUrl: `https://example.com/${Math.random().toString(36)}.txt`,
            },
          };
        });

      return () => {
        sandbox.restore();
      };
    });

    test(`everything is fine`, async ({ client, expect }) => {
      const files = ["file.ts", "image.jpg"];
      // this creates a stale content in the database
      await createSignedUploadUrl(files);

      const publicCase = await createPublicCase({
        ...getRandomPublicCases(1)[0],
        filepaths: ["file.ts", "image.jpg"],
      });

      const attachmentId = publicCase.attachment._id;

      const response = await client
        .get(`/api/attachment/${attachmentId}`)
        .then((res) => res);

      expect(response.status()).toBe(StatusCodes.OK);
      expect(response.body().data).toBeDefined();
      expect(response.body().data.length).toBe(2);
      expect(response.body().message).toBeDefined();
      expect(
        response
          .body()
          .data.every((signedUrl) =>
            signedUrl.startsWith("https://example.com"),
          ),
      ).toBeTruthy();
    });
  },
);
