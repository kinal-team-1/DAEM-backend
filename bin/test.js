import { configure, processCLIArgs, run } from "@japa/runner";
import { expect } from "@japa/expect";
import { apiClient } from "@japa/api-client";
import dbConnection from "../src/db/db-connection.js";
import mongoose from "mongoose";
import { app } from "../routes.js";

processCLIArgs(process.argv.splice(2));
configure({
  timeout: 3000,
  files: ["tests/**/*.spec.{js,ts}"],
  plugins: [expect(), apiClient(`http://localhost:${process.env.PORT}`)],
  configureSuite(suite) {
    suite.onGroup((group) => {
      group.tap(async (test) => {
        test.setup(async () => {
          // Clear the database before each test
          await Promise.all(
            Object.values(mongoose.connection.collections).map(
              async (collection) => {
                collection.deleteMany({});
              },
            ),
          );
        });
      });
    });
    suite.setup(async () => {
      const connection = await dbConnection();

      console.log("API suite setup");
      const server = app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`);
      });

      return () => {
        setTimeout(() => {
          server.close();
          connection.close();
        });
      };
    });
  },
});

run();
