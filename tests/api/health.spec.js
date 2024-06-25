import { test } from "@japa/runner";

test.group("Health check", () => {
  test("should return status code 200", async ({ expect, client }) => {
    const response = await client.get("/");
    console.log(response);

    expect(response.status()).toBe(200);
  });
});
