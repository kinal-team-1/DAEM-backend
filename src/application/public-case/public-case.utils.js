import { PublicCase } from "./public-case.model.js";

export const findPublicCasesByCoordinates = async (
  [long, lat],
  radius,
  page,
  limit,
) => {
  return PublicCase.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [Number.parseFloat(long), Number.parseFloat(lat)],
        },
        distanceField: "dist.calculated",
        key: "location.location_point",
        query: { tp_status: true },
        ...(radius ? { maxDistance: radius * 1000 } : {}),
        includeLocs: "dist.location",
        spherical: true,
      },
    },
    //  populate the attachment
    {
      $lookup: {
        from: "attachments",
        localField: "attachment",
        foreignField: "_id",
        as: "attachment",
      },
    },
    {
      $unwind: {
        path: "$attachment",
        preserveNullAndEmptyArrays: true, // Keeps documents even if no attachment is found
      },
    },
    // populate the submitter
    {
      $lookup: {
        from: "users",
        localField: "submitter",
        foreignField: "_id",
        as: "submitter",
      },
    },
    {
      $unwind: {
        path: "$submitter",
        preserveNullAndEmptyArrays: true, // Keeps documents even if no submitter is found
      },
    },
    { $skip: (page - 1) * limit },
    ...(limit ? [{ $limit: limit }] : []),
  ]);
};

export const findPublicCases = (page, limit) => {
  return PublicCase.find({
    tp_status: true,
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("attachment");
};
