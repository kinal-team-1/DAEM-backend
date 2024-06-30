import { supabaseClient } from "../../utils/supabase-client.js";
import { StatusCodes } from "http-status-codes";
import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { logger } from "../../utils/logger.js";
import { handleResponse } from "../../utils/handle-response.js";
import {
  AttachmentCreateGetSignedUrlError,
  AttachmentCreateUploadSignedUrlError,
} from "./attachment.errors.js";
import { Attachment } from "./attachment.model.js";
import { StaleContent } from "../stale-content/stale-content.model.js";
import mongoose from "mongoose";
import { StaleContentFailedToRemoveError } from "../stale-content/stale-content.errors.js";

// STALE CONTENT
export const createUploadSignedUrl = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    logger.info("Starting create upload signed url");

    const { filepath } = req.body;

    // save the file path to the stale content collection
    await new StaleContent({ filepath }).save();

    const { data, error } =
      await supabaseClient.createSignedUploadUrl(filepath); // URL expires in 2 hours

    if (error) {
      logger.fatal(error.stack);
      throw new AttachmentCreateUploadSignedUrlError(
        LL.ATTACHMENT.ERROR.CREATE_UPLOAD_SIGNED_URL(),
      );
    }

    const { signedUrl } = data;

    await session.commitTransaction();
    res.status(StatusCodes.OK).json({
      data: signedUrl,
      message: LL.ATTACHMENT.CONTROLLER.SIGNED_URL_CREATED(),
    });

    logger.info("Successfully created upload signed url");
  } catch (error) {
    logger.error(
      "Error creating upload signed url. Error of type" + error.name,
    );
    await session.abortTransaction();

    handleResponse(res, error, LL);
  } finally {
    session.endSession();
  }
};

// ATTACHMENT
export const createGetSignedUrlsAttachments = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Starting create get signed url");

    const { id } = req.params;

    const attachment = await Attachment.findOne({ _id: id, tp_status: true });

    const { data, error } = await supabaseClient.createSignedUrls(
      attachment.filepaths,
      60,
    );

    if (error) {
      throw new AttachmentCreateGetSignedUrlError(
        LL.ATTACHMENT.ERROR.CREATE_GET_SIGNED_URL(),
      );
    }

    res.status(StatusCodes.OK).json({
      data: data.map((d) => d.signedUrl),
      message: LL.ATTACHMENT.CONTROLLER.SIGNED_URL_CREATED(),
    });

    logger.info("Successfully created get signed url");
  } catch (error) {
    logger.error("Error creating get signed url. Error of type" + error.name);

    handleResponse(res, error, LL);
  }
};

// STALE CONTENT
export const deleteTemporaryFiles = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    logger.info("Starting delete temporary file");

    const { filepaths } = req.body;

    const staleList = await StaleContent.deleteMany({
      filepath: { $in: filepaths },
    });

    if (staleList.deletedCount !== filepaths.length) {
      throw new StaleContentFailedToRemoveError(
        LL.STALE_CONTENT.ERROR.FAILED_DELETE_ALL_FILES(),
      );
    }

    const { error } = await supabaseClient.remove(filepaths);

    if (error) {
      logger.fatal(error.stack);
      throw new StaleContentFailedToRemoveError(
        LL.STALE_CONTENT.ERROR.FAILED_DELETE_ALL_FILES(),
      );
    }

    await session.commitTransaction();
    res.status(StatusCodes.OK).json({
      message: LL.STALE_CONTENT.CONTROLLER.TEMPORARY_FILE_DELETED(),
      data: filepaths,
    });
    logger.info("Successfully deleted temporary file");
  } catch (error) {
    logger.error(`Error deleting temporary file. Error of type ${error.name}`);
    await session.abortTransaction();

    handleResponse(res, error, LL);
  } finally {
    session.endSession();
  }
};
