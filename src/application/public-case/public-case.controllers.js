import { getTranslationFunctions } from "../../utils/get-translations-locale.js";
import { handleResponse } from "../../utils/handle-response.js";
import { logger } from "../../utils/logger.js";
import { PublicCase } from "./public-case.model.js";
import { Location } from "../location/location.model.js";
import mongoose from "mongoose";
import { cleanObject } from "../../utils/clean-object.js";
import { StatusCodes } from "http-status-codes";

export const getFeedPublicCases = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  try {
    logger.info("Getting feed public cases");
    const { lat, long, radius, page, limit } = req.query;

    const [total, feedPublicCases] = await Promise.all([
      PublicCase.countDocuments(),
      PublicCase.aggregate([
        {
          $lookup: {
            from: "locations", // db collection name
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        { $unwind: "$location" },
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [Number.parseFloat(long), Number.parseFloat(lat)],
            },
            key: "location_point",
            distanceField: "dist.calculated",
            maxDistance: Number.parseInt(radius, 10) * 1000,
            includeLocs: "dist.location_point",
            spherical: true,
          },
        },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]),
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
      "Failed to get feed public cases. error of type: ",
      error.name,
    );

    handleResponse(res, error, LL);
  }
};

export const createPublicCase = async (req, res) => {
  const LL = getTranslationFunctions(req.locale);
  const session = await mongoose.startSession();
  session.startTransaction();
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
    } = req.body;

    const location = new Location(
      cleanObject({
        latitude,
        longitude,
        address,
        city,
        country,
        location_point: {
          coordinates: [longitude, latitude],
        },
      }),
    );

    const publicCase = new PublicCase(
      cleanObject({
        title,
        description,
        submitter,
        location: location._id,
      }),
    );

    await location.save();
    await publicCase.save();
    await session.commitTransaction();

    res.status(StatusCodes.OK).json({
      data: publicCase,
      message: LL.PUBLIC_CASE.CONTROLLER.CREATED(),
    });
    logger.info("Successfully created public case");
  } catch (error) {
    await session.abortTransaction();
    logger.error("Failed to create public case. error of type: ", error.name);

    handleResponse(res, error, LL);
  } finally {
    session.endSession();
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
    logger.error("Failed to delete public case. error of type: ", error.name);

    handleResponse(res, error, LL);
  }
};