import { Router } from "express";
import { pagination } from "../../middleware/pagination.js";
import {
  locationSearchQueryParams,
  locationValidation,
} from "../../middleware/coordinates-validation.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { body, param } from "express-validator";
import { message } from "../../utils/message.js";
import {
  createAnonymousCase,
  deleteAnonymousCaseById,
  getAllAnonymousCases,
} from "./anonymous-case.controllers.js";
import { custom } from "../../middleware/custom.js";
import { AnonymousCase } from "./anonymous-case.model.js";
import { AnonymousCaseNotFoundError } from "./anonymous-case.errors.js";
import {
  filepathsValidation,
  validateOptionalsFilepathsAreInStaleContent,
} from "../../middleware/filepaths.js";

const router = Router();

router
  .route("/")
  .get(
    [...pagination, ...locationSearchQueryParams, validateChecks],
    getAllAnonymousCases,
  )
  .post(
    [
      body(
        "description",
        message((LL) => LL.ANONYMOUS_CASE.ROUTE.DESCRIPTION_REQUIRED()),
      )
        .isString()
        .isLength({ min: 20 }),
      body(
        "key",
        message((LL) => LL.ANONYMOUS_CASE.ROUTE.OPTIONAL_KEY()),
      )
        .optional()
        .isString()
        .isLength({ min: 21 }),
      body(
        "title",
        message((LL) => LL.ANONYMOUS_CASE.ROUTE.TITLE_REQUIRED()),
      )
        .isString()
        .isLength({ min: 3 }),
      ...filepathsValidation,
      ...locationValidation,
      validateChecks,
      validateOptionalsFilepathsAreInStaleContent,
    ],
    createAnonymousCase,
  );

router.delete(
  "/:id",
  [
    param(
      "id",
      message((LL) => LL.ANONYMOUS_CASE.ROUTE.ANONYMOUS_CASE_ID_REQUIRED()),
    ).isMongoId(),
    validateChecks,
    custom(async (req, LL) => {
      const { id } = req.params;

      const anonymousCaseFound = await AnonymousCase.findOne({
        _id: id,
        tp_status: true,
      });
      if (!anonymousCaseFound) {
        throw new AnonymousCaseNotFoundError(
          LL.ANONYMOUS_CASE.ERROR.NOT_FOUND(),
        );
      }
    }),
  ],
  deleteAnonymousCaseById,
);

export default router;
