import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { getTranslationFunctions } from "../utils/get-translations-locale.js";

export const validateChecks = async (req, res, next) => {
  const LL = getTranslationFunctions(req.locale);
  const result = validationResult.withDefaults({
    formatter(error) {
      if (error.type === "field") {
        return `[${error.location}][${error.path}]: ${error.msg}`;
      }

      if (error.type === "alternative_grouped") {
        const list = error.nestedErrors.flat();

        const errors = [...new Set(list.map((e) => e.path))];
        const locations = [...new Set(list.map((e) => e.location))];

        return `[${locations.join("|")}][${errors.join("|")}]: ${error.msg}`;
      }

      if (process.env.NODE_ENV === "test") {
        throw new Error("ERROR TYPE NOT SUPPORTED");
      }

      return error.msg;
    },
  })(req);

  if (!result.isEmpty()) {
    // eslint-disable-next-line @joao-cst/enforce-consistent-return-express
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: [...new Set(result.array())],
      message: LL.GENERAL.ROUTE.INVALID_REQUEST(),
    });
  }

  return next();
};
