import { config } from "dotenv";
import { expand } from "dotenv-expand";
import dbConnection from "./src/db/db-connection.js";

const isTestEnv = process.env.NODE_ENV === "test";
const isProdEnv = process.env.NODE_ENV === "production";

const loadEnv = async () => {
  if (!isProdEnv && !isTestEnv) {
    const env = config({
      path: [".env", ".env.example"],
    });
    expand(env);
  }

  if (isTestEnv) {
    const env = config({
      path: [".env.test", ".env.example", ".env"],
    });

    expand(env);

    // IF NODE_ENV is `test`, we should connect to the test database
    // here, since later on it will be impossible to change the connection
    await dbConnection();
  }
};

await loadEnv();
