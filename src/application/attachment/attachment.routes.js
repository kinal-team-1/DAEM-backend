import { Router } from "express";
import { body, param } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import {
  createGetSignedUrl,
  createUploadSignedUrl,
} from "./attachment.controllers.js";
import { custom } from "../../middleware/custom.js";
import { Attachment } from "./attachment.model.js";
import { AttachmentNotFoundError } from "./attachment.errors.js";
import { StaleContent } from "../stale-content/stale-content.model.js";
import { StaleContentNotFoundError } from "../stale-content/stale-content.errors.js";

const router = Router();

router.post(
  "/upload",
  [
    body(
      "file",
      message((LL) => LL.ATTACHMENT.ROUTE.FILE_REQUIRED()),
    ).exists(),
    validateChecks,
  ],
  createUploadSignedUrl,
);

router.post(
  "/:id",
  [
    param(
      "id",
      message((LL) => LL.ATTACHMENT.ROUTE.ATTACHMENT_ID_REQUIRED()),
    ).isMongoId(),
    custom(async (req, LL) => {
      const { id } = req.params;

      const attachment = await Attachment.findOne({ _id: id, tp_status: true });

      if (!attachment) {
        throw new AttachmentNotFoundError(LL.ATTACHMENT.ERROR.NOT_FOUND());
      }
    }),
    validateChecks,
  ],
  createGetSignedUrl,
);

// delete stale content
router.delete("/", [
  body(
    "filePaths",
    message((LL) => LL.STALE_CONTENT.ROUTE.FILE_PATHS_REQUIRED()),
  ).isArray({ min: 1 }),
  body(
    "filePaths.*",
    message((LL) => LL.STALE_CONTENT.ROUTE.FILE_PATHS_REQUIRED()),
  )
    .isString()
    .notEmpty(),
  validateChecks,
  custom(async (req, LL) => {
    const { filePaths } = req.body;

    const foundContent = [
      ...(await StaleContent.find({
        filePath: { $in: filePaths },
      })),
    ];

    const notFoundContent = filePaths.filter((filePath) => {
      const found = foundContent.find(
        (content) => content.filePath === filePath,
      );

      return !found;
    });

    if (notFoundContent.length > 0) {
      throw new StaleContentNotFoundError(
        LL.STALE_CONTENT.ROUTE.NOT_FOUND({ paths: notFoundContent.join(", ") }),
      );
    }
  }),
]);

export default router;
