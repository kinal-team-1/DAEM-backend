import { query } from "express-validator";
import { message } from "../utils/message.js";

export const pagination = [
  query(
    "page",
    message((LL) => LL.GENERAL.ROUTES.OPTIONAL_PAGE_QUERY()),
  )
    .optional()
    .isInt({ min: 1 })
    .toInt(10),
  query(
    "limit",
    message((LL) => LL.GENERAL.ROUTES.OPTIONAL_LIMIT_QUERY()),
  )
    .optional()
    .isInt({ min: 1 })
    .toInt(10),
];
