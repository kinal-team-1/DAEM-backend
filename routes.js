import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { getTranslationFunctions } from "./src/utils/get-translations-locale.js";
import { StatusCodes } from "http-status-codes";
import dbConnection from "./src/db/db-connection.js";
import { printLanguage } from "./src/middleware/print-language.js";
import { retrieveLocale } from "./src/middleware/retrieve-locale.js";
import { logger } from "./src/utils/logger.js";
import publicCasesRouter from "./src/application/public-case/public-case.routes.js";
import authRouter from "./src/application/auth/auth.routes.js";

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
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

console.log("NODE_ENV", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
});

export const app = express();

// eslint-disable-next-line @joao-cst/enforce-consistent-return-express
app.use(express.json());
app.use((req, res, next) => {
  logger.request_info(
    {
      METHOD: req.method,
      PATH: req.path,
      "content-type": req.headers["content-type"],
    },
    "Received Request",
  );
  next();
});
app.use(cors());
app.use(retrieveLocale);

app.get("/", (req, res) => {
  // @ts-ignore
  const LL = getTranslationFunctions(req.locale);
  res.status(StatusCodes.OK).json({ message: LL.HI(), data: undefined });
});

app.use("/api/public-case", publicCasesRouter);
app.use("/api/auth", authRouter);

app.use(printLanguage);

app.use("*", (req, res) => {
  logger.request_info("Route not found " + req.path);
  // @ts-ignore
  const LL = getTranslationFunctions(req.locale);

  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: LL.GENERAL.ROUTE.ENDPOINT_NOT_FOUND(), data: undefined });
});
