import { Router } from "express";
import { pagination } from "../../middleware/pagination.js";
import {
  locationSearchQueryParams,
  locationValidation,
} from "../../middleware/coordinates-validation.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { body } from "express-validator";
import { message } from "../../utils/message.js";
import { getAllAnonymousCases } from "./anonymous-case.controllers.js";

const router = Router();

router
  .route("/")
  .get(
    [...pagination, ...locationSearchQueryParams, validateChecks],
    getAllAnonymousCases,
  )
  .post([
    body(
      "description",
      message((LL) => LL.ANONYMOUS_CASE.ROUTE.DESCRIPTION_REQUIRED()),
    ),
    ...locationValidation,
  ]);

export default router;
