import { Router } from "express";
import { message } from "../../utils/message.js";
import { param } from "express-validator";
import {
  createPublicCase,
  deletePublicCase,
  getFeedPublicCases,
  getPublicCaseById,
  getPublicCaseByUserId,
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
import {
  filepathsValidation,
  validateOptionalsFilepathsAreInStaleContent,
} from "../../middleware/filepaths.js";
import { User } from "../user/user.model.js";
import { UserNotFoundError } from "../user/user.errors.js";

const router = Router();

router
  .route("/")
  .get(
    [...pagination, ...locationSearchQueryParams, validateChecks],
    getFeedPublicCases,
  )
  .post(
    [
      ...publicCaseValidation,
      ...locationValidation,
      ...filepathsValidation,
      validateChecks,
      validateOptionalsFilepathsAreInStaleContent,
    ],
    createPublicCase,
  );
router.get(
  ":id",
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
  getPublicCaseById,
);

router.get(
  "/by-user/:userId",
  [
    param(
      "userId",
      message((LL) => LL.PUBLIC_CASE.ROUTE.SUBMITTER_REQUIRED()),
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
  getPublicCaseByUserId,
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
