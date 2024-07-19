import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { handleResponse } from "../../utils/handle-response.js";
import { logger } from "../../utils/logger.js";
import { Contribution } from "./contribution-case.model.js";
import { Attachment } from "../attachment/attachment.model.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const getContributions = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Getting contributions");
    const { page = 1, limit = 10 } = req.query;

    const [total, contributions] = await Promise.all([
      Contribution.countDocuments(),
      Contribution.find()
        .populate("user_id case_id attachments")
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.status(StatusCodes.OK).json({
      data: contributions,
      message: LL.CONTRIBUTION_CASE.CONTROLLER.GET_CONTRIBUTION_SUCCESS(),
      total,
      page,
      limit,
    });

    logger.info("Successfully got contributions");
  } catch (error) {
    logger.error("Failed to get contributions. Error of type: " + error.name);
    handleResponse(res, error, LL);
  }
};

export const createContribution = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    logger.info("Creating contribution");

    const { user_id, case_id, content, filepaths } = req.body;

    let dbAttachment;

    if (filepaths) {
      dbAttachment = new Attachment({
        filepaths,
      });

      await dbAttachment.save();
    }

    const contribution = new Contribution({
      user_id,
      case_id,
      content,
      created_at: Date.now(),
      ...(dbAttachment && { attachment: dbAttachment._id }),
    });

    await contribution.save();
    await contribution.populate("user_id case_id attachments");
    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({
      data: contribution,
      message: LL.CONTRIBUTION_CASE.CONTROLLER.CREATED(),
    });

    logger.info("Successfully created contribution");
  } catch (error) {
    logger.error("Failed to create contribution. Error of type: " + error.name);
    await session.abortTransaction();

    handleResponse(res, error, LL);
  } finally {
    session.endSession();
  }
};

export const deleteContribution = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Deleting contribution");

    const { id } = req.params;

    const contribution = await Contribution.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json({
      data: contribution,
      message: LL.CONTRIBUTION_CASE.CONTROLLER.DELETED(),
    });

    logger.info("Successfully deleted contribution");
  } catch (error) {
    logger.error("Failed to delete contribution. Error of type: " + error.name);
    handleResponse(res, error, LL);
  }
};
