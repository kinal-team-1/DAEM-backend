import { test } from "@japa/runner";
import "@japa/expect";
import "@japa/api-client";

test.group("Health check", () => {
  test("should return status code 200", async ({ expect, client }) => {
    const response = await client.get("/").then((res) => res);

    expect(response.status()).toBe(200);
  });
});
