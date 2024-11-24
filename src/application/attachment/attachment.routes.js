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
import {
  AttachmentAlreadyExistsError,
  AttachmentNotFoundError,
} from "./attachment.errors.js";
import { validateOptionalsFilepathsAreInStaleContent } from "../../middleware/filepaths.js";
import { StaleContent } from "../stale-content/stale-content.model.js";
import { StaleContentAlreadyExistsError } from "../stale-content/stale-content.errors.js";

const router = Router();

router.post(
  "/upload",
  [
    body(
      "filepath",
      message((LL) => LL.ATTACHMENT.ROUTE.FILE_REQUIRED()),
    ).exists(),
    validateChecks,
    custom(async (req, LL) => {
      const { filepath } = req.body;

      const staleContentFound = await StaleContent.findOne({
        filepath,
      });

      if (staleContentFound) {
        throw new StaleContentAlreadyExistsError(
          LL.STALE_CONTENT.ERROR.FILEPATH_ALREADY_EXISTS(),
        );
      }

      const attachmentFound = await Attachment.findOne({
        // find one attachment with this filepath in his filepaths array
        filepaths: { $elemMatch: { $eq: filepath } },
      });

      if (attachmentFound) {
        throw new AttachmentAlreadyExistsError(
          LL.ATTACHMENT.ERROR.FILEPATH_ALREADY_EXISTS({
            filepath,
          }),
        );
      }
    }),
  ],
  createUploadSignedUrl,
);

router.get(
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
