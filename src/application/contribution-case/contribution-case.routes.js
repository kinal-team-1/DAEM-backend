import { Router } from "express";
import { message } from "../../utils/message.js";
import { body, param } from "express-validator";
import {
  createContribution,
  deleteContribution,
  getContributions,
  getContributionsByPublicCaseId,
  getContributionsByUserId,
} from "./contribution-case.controller.js";
import { pagination } from "../../middleware/pagination.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { custom } from "../../middleware/custom.js";
import { Contribution } from "./contribution-case.model.js";
import { ContributionCaseNotFoundError } from "./contribution-case.errors.js";
import {
  filepathsValidation,
  validateOptionalsFilepathsAreInStaleContent,
} from "../../middleware/filepaths.js";
import { User } from "../user/user.model.js";
import { UserNotFoundError } from "../user/user.errors.js";
import { PublicCase } from "../public-case/public-case.model.js";

const router = Router();

router
  .route("/")
  .get([...pagination, validateChecks], getContributions)
  .post(
    [
      body("user_id", "user id is required").isMongoId(),
      body("case_id", "case id is required").isMongoId(),
      body("content", "content required").isString(),
      ...filepathsValidation,
      validateChecks,
      validateOptionalsFilepathsAreInStaleContent,
    ],
    createContribution,
  );

router.get(
  "/by-public-case/:publicCaseId",
  [
    param(
      "publicCaseId",
      message((LL) => LL.CONTRIBUTION_CASE.ROUTE.PUBLIC_CASE_ID_REQUIRED()),
    ).isMongoId(),
    custom(async (req, LL) => {
      const { publicCaseId } = req.params;

      const publicCaseFound = await PublicCase.findOne({
        _id: publicCaseId,
        tp_status: true,
      });

      if (!publicCaseFound) {
        throw new ContributionCaseNotFoundError(
          LL.PUBLIC_CASE.ERROR.NOT_FOUND(),
        );
      }
    }),
  ],
  getContributionsByPublicCaseId,
);

router.get(
  "/by-user/:userId",
  [
    param(
      "userId",
      message((LL) => LL.CONTRIBUTION_CASE.ROUTE.USER_ID_REQUIRED()),
    ).isMongoId(),
    validateChecks,
    custom(async (req, LL) => {
      const { userId } = req.params;

      const userFound = await User.findOne({
        _id: userId,
        tp_status: true,
      });

      if (!userFound) {
        throw new UserNotFoundError(LL.USER.ERROR.NOT_FOUND());
      }
    }),
  ],
  getContributionsByUserId,
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
