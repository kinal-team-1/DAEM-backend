import { config } from "dotenv";
import dbConnection from "./src/db/db-connection.js";

const isTestEnv = process.env.NODE_ENV === "test";
const isProdEnv = process.env.NODE_ENV === "production";

const loadEnv = async () => {
  if (!isProdEnv && !isTestEnv) {
    config({
      path: [".env", ".env.example"],
    });
  }

  if (isTestEnv) {
    config({
      path: [".env.test", ".env.example", ".env"],
    });

    // IF NODE_ENV is `test`, we should connect to the test database
    // here, since later on it will be impossible to change the connection
    await dbConnection();
  }
};

await loadEnv();
