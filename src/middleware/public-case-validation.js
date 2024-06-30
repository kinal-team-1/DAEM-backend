import { body } from "express-validator";
import { message } from "../utils/message.js";

export const publicCaseValidation = [
  body(
    "title",
    message((LL) => LL.PUBLIC_CASE.ROUTE.TITLE_REQUIRED()),
  )
    .isString()
    .isLength({ min: 5, max: 100 }),

  body(
    "description",
    message((LL) => LL.PUBLIC_CASE.ROUTE.DESCRIPTION_REQUIRED()),
  )
    .isString()
    .isLength({ min: 20 }),

  body(
    "submitter",
    message((LL) => LL.PUBLIC_CASE.ROUTE.SUBMITTER_REQUIRED()),
  ).isMongoId(),
  body(
    "attachment",
    message((LL) => LL.PUBLIC_CASE.ROUTE.OPTIONAL_ATTACHMENT()),
  )
    .optional()
    .isArray({ min: 1 }),
  body(
    "attachment.*",
    message((LL) => LL.PUBLIC_CASE.ROUTE.OPTIONAL_ATTACHMENT()),
  )
    .optional()
    .isString()
    .notEmpty(),
];
