import { Contribution } from "./contribution-case.model.js";

export const findContributionCases = (page, limit) => {
  return Contribution.find({
    tp_status: true,
  })
    .skip((page - 1) * limit)
    .limit(limit);
};
