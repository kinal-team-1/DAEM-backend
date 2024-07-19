import { Router } from "express";
import { message } from "../../utils/message.js";
import { param } from "express-validator";
import {
  createContribution,
  deleteContribution,
  getContributions,
} from "./contribution-case.controller.js";
import { pagination } from "../../middleware/pagination.js";
import {
  locationSearchQueryParams,
  locationValidation,
} from "../../middleware/coordinates-validation.js";
import { publicCaseValidation } from "../../middleware/public-case-validation.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { custom } from "../../middleware/custom.js";
import { Contribution } from "./contribution-case.model.js";
import { ContributionCaseNotFoundError } from "./contribution-case.errors.js";
import {
  filepathsValidation,
  validateOptionalsFilepathsAreInStaleContent,
} from "../../middleware/filepaths.js";

const router = Router();

router
  .route("/")
  .get(
    [...pagination, ...locationSearchQueryParams, validateChecks],
    getContributions,
  )
  .post(
    [
      ...publicCaseValidation,
      ...locationValidation,
      ...filepathsValidation,
      validateChecks,
      validateOptionalsFilepathsAreInStaleContent,
    ],
    createContribution,
  );

router.delete(
  "/:id",
  [
    param(
      "id",
      message((LL) =>
        LL.CONTRIBUTION_CASE.ROUTE.CONTRIBUTION_CASE_ID_REQUIRED(),
      ),
    ).isMongoId(),
    validateChecks,
    custom(async (req, LL) => {
      const { id } = req.params;

      const contributionCaseFound = await Contribution.findOne({
        _id: id,
        tp_status: true,
      });

      if (!contributionCaseFound) {
        throw new ContributionCaseNotFoundError(
          LL.CONTRIBUTION_CASE.ERROR.NOT_FOUND(),
        );
      }
    }),
  ],
  deleteContribution,
);

export default router;
