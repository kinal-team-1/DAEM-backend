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
