import { PublicCase } from "./public-case.model.js";

export const findPublicCasesByCoordinates = async (
  [long, lat],
  radius,
  page,
  limit,
) => {
  return PublicCase.aggregate([
    { $match: { tp_status: true } },
    {
      $lookup: {
        from: "locations", // db collection name
        let: { locationId: "$location" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$locationId"],
              },
            },
          },
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [Number.parseFloat(long), Number.parseFloat(lat)],
              },
              key: "location_point",
              distanceField: "dist.calculated",
              ...(radius ? { maxDistance: radius * 1000 } : undefined),
              includeLocs: "dist.location_point",
              spherical: true,
            },
          },
        ],
        as: "location",
      },
    },
    { $unwind: "$location" },
    { $skip: (page - 1) * limit },
    ...(limit ? [{ $limit: limit }] : []),
  ]);
};

export const findPublicCases = (page, limit) => {
  return PublicCase.find({
    tp_status: true,
  })
    .skip((page - 1) * limit)
    .limit(limit);
};
