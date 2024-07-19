import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { handleResponse } from "../../utils/handle-response.js";
import { logger } from "../../utils/logger.js";
import { PublicCase } from "./public-case.model.js";
import { cleanObject } from "../../utils/clean-object.js";
import { StatusCodes } from "http-status-codes";
import {
  findPublicCases,
  findPublicCasesByCoordinates,
} from "./public-case.utils.js";
import { Attachment } from "../attachment/attachment.model.js";
import mongoose from "mongoose";
import { StaleContent } from "../stale-content/stale-content.model.js";
import { PublicCaseFailedToUploadImagesError } from "./public-case.errors.js";

export const getFeedPublicCases = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Getting feed public cases");
    const { lat, long, radius, page = 1, limit = 0 } = req.query;
    const hasCoordinates = Number.isFinite(lat) && Number.isFinite(long);

    const [total, feedPublicCases] = await Promise.all([
      PublicCase.countDocuments({ tp_status: true }),
      hasCoordinates
        ? findPublicCasesByCoordinates([long, lat], radius, page, limit)
        : findPublicCases(page, limit),
    ]);

    res.status(StatusCodes.OK).json({
      data: feedPublicCases,
      message: LL.PUBLIC_CASE.CONTROLLER.GET_FEED_SUCCESS(),
      total,
      page,
      limit,
    });

    logger.info("Successfully got feed public cases");
  } catch (error) {
    logger.error(
      "Failed to get feed public cases. error of type: " + error.name,
    );

    handleResponse(res, error, LL);
  }
};

export const createPublicCase = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    logger.info("Creating public case");

    const {
      title,
      description,
      latitude,
      longitude,
      address,
      city,
      country,
      submitter,
      filepaths,
    } = req.body;

    let dbAttachment;

    if (filepaths) {
      const deleted = await StaleContent.deleteMany({
        filepath: { $in: filepaths },
      });

      if (deleted.deletedCount !== filepaths.length) {
        throw new PublicCaseFailedToUploadImagesError(
          LL.PUBLIC_CASE.ERROR.FAILED_UPLOAD_IMAGES(),
        );
      }

      dbAttachment = new Attachment(
        cleanObject({
          filepaths,
        }),
      );

      await dbAttachment.save();
    }

    const publicCase = new PublicCase(
      cleanObject({
        title,
        description,
        submitter,
        location: {
          latitude,
          longitude,
          address,
          city,
          country,
          location_point: {
            coordinates: [longitude, latitude],
          },
        },
        ...(dbAttachment && { attachment: dbAttachment._id }),
      }),
    );

    await publicCase.save();
    await publicCase.populate("attachment");
    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({
      data: publicCase,
      message: LL.PUBLIC_CASE.CONTROLLER.CREATED(),
    });

    logger.info("Successfully created public case");
  } catch (error) {
    logger.error("Failed to create public case. error of type: " + error.name);
    await session.abortTransaction();

    handleResponse(res, error, LL);
  } finally {
    session.endSession();
  }
};

export const getPublicCaseById = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Getting public case by id");

    const { id } = req.params;

    const publicCase = await PublicCase.findOne({
      _id: id,
      tp_status: true,
    }).populate("attachment submitter");

    res.status(StatusCodes.OK).json({
      data: publicCase,
      message: LL.PUBLIC_CASE.CONTROLLER.GET_BY_ID(),
    });

    logger.info("Successfully got public case by id");
  } catch (error) {
    logger.error(
      "Failed to get public case by id. error of type: " + error.name,
    );

    handleResponse(res, error, LL);
  }
};

export const deletePublicCase = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Deleting public case");

    const { id } = req.params;

    const publicCase = await PublicCase.findByIdAndUpdate(id, {
      tp_status: false,
    });

    res.status(StatusCodes.OK).json({
      data: publicCase,
      message: LL.PUBLIC_CASE.CONTROLLER.DELETED(),
    });

    logger.info("Successfully deleted public case");
  } catch (error) {
    logger.error("Failed to delete public case. error of type: " + error.name);

    handleResponse(res, error, LL);
  }
};
