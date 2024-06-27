import { Router } from "express";
import { message } from "../../utils/message.js";
import { param, query } from "express-validator";
import {
  createPublicCase,
  deletePublicCase,
  getFeedPublicCases,
} from "./public-case.controllers.js";
import { pagination } from "../../middleware/pagination.js";
import { locationValidation } from "../../middleware/coordinates-validation.js";
import { publicCaseValidation } from "../../middleware/public-case-validation.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import { custom } from "../../middleware/custom.js";
import { PublicCase } from "./public-case.model.js";
import { PublicCaseNotFoundError } from "./public-case.errors.js";
import { LocationIncompleteCoordinatesError } from "../location/location-error.error.js";

const router = Router();

router
  .route("/")
  .get(
    [
      ...pagination,
      query(
        "lat",
        message((LL) => LL.LOCATION.ROUTES.OPTIONAL_LATITUDE()),
      )
        .optional()
        .isFloat({ min: -90, max: 90 })
        .toFloat(),

      query(
        "long",
        message((LL) => LL.LOCATION.ROUTES.OPTIONAL_LONGITUDE()),
      )
        .optional()
        .isFloat({ min: -180, max: 180 })
        .toFloat(),
      query(
        "radius",
        message((LL) => LL.LOCATION.ROUTES.OPTIONAL_RADIUS()),
      )
        .optional()
        .isInt({ min: 1 })
        .toInt(10),
      validateChecks,

      custom(async (req, LL) => {
        const { lat, long } = req.query;

        const oneIsDefined = Number.isFinite(lat) || Number.isFinite(long);
        const oneIsMissing = !Number.isFinite(lat) || !Number.isFinite(long);

        if (oneIsDefined && oneIsMissing) {
          throw new LocationIncompleteCoordinatesError(
            LL.LOCATION.ERROR.INCOMPLETE_COORDINATES(),
          );
        }
      }),
    ],
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
      message((LL) => LL.PUBLIC_CASE.ROUTES.PUBLIC_CASE_ID_REQUIRED()),
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
