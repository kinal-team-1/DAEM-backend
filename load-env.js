import { config } from "dotenv";
import dbConnection from "./src/db/db-connection.js";

if (process.env.NODE_ENV !== "production") {
  config({
    path: [".env", ".env.example"],
  });
}

if (process.env.NODE_ENV === "test") {
  config({
    path: [".env.test"],
  });
  // IF NODE_ENV is `test`, we should connect to the test database
  // here, since later on it will be impossible to change the connection
  await dbConnection();
}
