import { configure, processCLIArgs, run } from "@japa/runner";
import { expect } from "@japa/expect";
import { ApiClient, apiClient } from "@japa/api-client";
import dbConnection from "../src/db/db-connection.js";
import mongoose from "mongoose";
import { app } from "../routes.js";

ApiClient.setup(async () => {
  const connection = await dbConnection();

  // clean up the database before running the tests
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) => {
      collection.deleteMany({});
    }),
  );

  return () => {
    connection.close();
  };
});

processCLIArgs(process.argv.splice(2));
configure({
  files: ["tests/**/*.spec.js"],
  plugins: [expect(), apiClient(`http://localhost:${process.env.PORT}`)],
  configureSuite(suite) {
    suite.setup(async () => {
      // Setup logic goes here
      console.log("API suite setup");
      const server = app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`);
      });

      return () => {
        server.close();
      };
    });
  },
});

run();
