import { Router } from "express";
import { body, param } from "express-validator";
import { message } from "../../utils/message.js";
import { validateChecks } from "../../middleware/validate-checks.js";
import {
  createGetSignedUrlsAttachments,
  createUploadSignedUrl,
  deleteTemporaryFiles,
} from "./attachment.controllers.js";
import { custom } from "../../middleware/custom.js";
import { Attachment } from "./attachment.model.js";
import { AttachmentNotFoundError } from "./attachment.errors.js";
import { validateOptionalsFilepathsAreInStaleContent } from "../../middleware/filepaths.js";

const router = Router();

router.post(
  "/upload",
  [
    body(
      "filepath",
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
  createGetSignedUrlsAttachments,
);

// delete stale content
router.delete(
  "/",
  [
    body(
      "filepaths",
      message((LL) => LL.STALE_CONTENT.ROUTE.FILE_PATHS_REQUIRED()),
    ).isArray({ min: 1 }),
    body(
      "filepaths.*",
      message((LL) => LL.STALE_CONTENT.ROUTE.FILE_PATHS_REQUIRED()),
    )
      .isString()
      .notEmpty(),
    validateChecks,
    validateOptionalsFilepathsAreInStaleContent,
  ],
  deleteTemporaryFiles,
);

export default router;
