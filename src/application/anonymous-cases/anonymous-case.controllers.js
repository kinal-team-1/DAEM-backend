import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { logger } from "../../utils/logger.js";
import { handleResponse } from "../../utils/handle-response.js";
import { AnonymousCase } from "./anonymous-case.model.js";
import { StatusCodes } from "http-status-codes";
import { cleanObject } from "../../utils/clean-object.js";
import {
  findAnonymousCases,
  findAnonymousCasesByCoordinates,
  generateKey,
} from "./anonymous-case.utils.js";
import mongoose from "mongoose";

export const getAllAnonymousCases = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Starting to get all anonymous cases");

    const { page = 1, limit = 0, lat, long, radius } = req.query;

    const hasCoordinates = Number.isFinite(lat) && Number.isFinite(long);

    const [total, anonymousCases] = await Promise.all([
      AnonymousCase.countDocuments({ tp_status: true }),
      hasCoordinates
        ? findAnonymousCasesByCoordinates([long, lat], radius, page, limit)
        : findAnonymousCases(page, limit),
    ]);

    res.status(StatusCodes.OK).json({
      data: anonymousCases,
      message: LL.ANONYMOUS_CASE.CONTROLLER.GET_ALL_SUCCESS(),
      total,
      page,
      limit,
    });

    logger.info("Successfully got all anonymous cases");
  } catch (error) {
    logger.error(
      "Error getting all anonymous cases. Error of type " + error.name,
    );

    handleResponse(res, error, LL);
  }
};

export const createAnonymousCase = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    logger.info("Starting to create anonymous case");

    const { description, latitude, longitude, address, city, country, key } =
      req.body;

    let anonymousCaseId;
    if (key) {
      const anonymousCaseKey = await AnonymousCase.findOne({ key });
      anonymousCaseId = anonymousCaseKey._id;
    } else {
      const anonymousCaseKey = new AnonymousCase({
        key: generateKey(),
      });
      await anonymousCaseKey.save();
      anonymousCaseId = anonymousCaseKey._id;
    }

    const anonymousCase = new AnonymousCase(
      cleanObject({
        description,
        key: anonymousCaseId,
        location: {
          type: "Point",
          coordinates: [latitude, longitude],
          address,
          city,
          country,
        },
      }),
    );

    await anonymousCase.save();
    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({
      data: anonymousCase,
      message: LL.ANONYMOUS_CASE.CONTROLLER.CREATED(),
    });

    logger.info("Successfully created anonymous case");
  } catch (error) {
    logger.error("Error creating anonymous case. Error of type " + error.name);
    await session.abortTransaction();

    handleResponse(res, error, LL);
  } finally {
    session.endSession();
  }
};
