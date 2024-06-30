import "./load-env.js";
import express from "express";
import cors from "cors";
import { getTranslationFunctions } from "./src/utils/get-translations-locale.js";
import { StatusCodes } from "http-status-codes";
import { printLanguage } from "./src/middleware/print-language.js";
import { retrieveLocale } from "./src/middleware/retrieve-locale.js";
import { logger } from "./src/utils/logger.js";
import publicCasesRouter from "./src/application/public-case/public-case.routes.js";
import authRouter from "./src/application/auth/auth.routes.js";
import userRouter from "./src/application/user/user.routes.js";
import anonymousCaseRouter from "./src/application/anonymous-cases/anonymous-case.routes.js";
import attachmentRouter from "./src/application/attachment/attachment.routes.js";

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

app.use(printLanguage);

app.use("/api/public-case", publicCasesRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/anonymous-case", anonymousCaseRouter);
app.use("/api/attachment", attachmentRouter);

app.use("*", (req, res) => {
  logger.request_info("Route not found " + req.path);
  // @ts-ignore
  const LL = getTranslationFunctions(req.locale);

  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: LL.GENERAL.ROUTE.ENDPOINT_NOT_FOUND(), data: undefined });
});
