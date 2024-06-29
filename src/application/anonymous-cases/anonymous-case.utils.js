import { AnonymousCase } from "./anonymous-case.model.js";

export const findAnonymousCases = async (page, limit) => {
  return AnonymousCase.find({ tp_status: true })
    .skip((page - 1) * limit)
    .limit(limit);
};

export const findAnonymousCasesByCoordinates = async (
  [long, lat],
  radius,
  page,
  limit,
) => {
  return AnonymousCase.aggregate([
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

export const generateKey = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  return `GT-${formattedDate}-${Math.random().toString(10).slice(2, 9)}`;
};
