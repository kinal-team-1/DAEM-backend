import { beforeAll } from "vitest";
import { app } from "./routes.js";
import supertest from "supertest";

export let client;

beforeAll(() => {
  // put up server
  client = supertest(app).;
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  return () => {
    // close server
    server.close();
  };
});
