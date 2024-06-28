import { Router } from "express";
import { message } from "../../utils/message.js";
import { param } from "express-validator";
import {
  createPublicCase,
  deletePublicCase,
  getFeedPublicCases,
} from "./public-case.controllers.js";
import { pagination } from "../../middleware/pagination.js";
import {
  locationSearchQueryParams,
  locationValidation,
} from "../../middleware/coordinates-validation.js";
import { publicCaseValidation } from "../../middleware/public-case-validation.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { custom } from "../../middleware/custom.js";
import { PublicCase } from "./public-case.model.js";
import { PublicCaseNotFoundError } from "./public-case.errors.js";

const router = Router();

router
  .route("/")
  .get(
    [...pagination, ...locationSearchQueryParams, validateChecks],
    getFeedPublicCases,
  )
  .post(
    [...publicCaseValidation, ...locationValidation, validateChecks],
    createPublicCase,
  );

router.delete(
  "/:id",
  [
    param(
      "id",
      message((LL) => LL.PUBLIC_CASE.ROUTE.PUBLIC_CASE_ID_REQUIRED()),
    ).isMongoId(),
    validateChecks,
    custom(async (req, LL) => {
      const { id } = req.params;

      const publicCaseFound = await PublicCase.findOne({
        _id: id,
        tp_status: true,
      });

      if (!publicCaseFound) {
        throw new PublicCaseNotFoundError(LL.PUBLIC_CASE.ERROR.NOT_FOUND());
      }
    }),
  ],
  deletePublicCase,
);

export default router;
