import { body } from "express-validator";
import { message } from "../utils/message.js";

export const publicCaseValidation = [
  body(
    "title",
    message((LL) => LL.PUBLIC_CASE.ROUTES.TITLE_REQUIRED()),
  )
    .isString()
    .isLength({ min: 5, max: 100 }),

  body(
    "description",
    message((LL) => LL.PUBLIC_CASE.ROUTES.DESCRIPTION_REQUIRED()),
  )
    .isString()
    .isLength({ min: 20 }),

  body(
    "submitter",
    message((LL) => LL.PUBLIC_CASE.ROUTES.SUBMITTER_REQUIRED()),
  ).isMongoId(),
];
