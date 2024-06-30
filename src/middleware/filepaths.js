import { body } from "express-validator";
import { message } from "../utils/message.js";
import { custom } from "./custom.js";
import { StaleContent } from "../application/stale-content/stale-content.model.js";
import { StaleContentNotFoundError } from "../application/stale-content/stale-content.errors.js";

export const filepathsValidation = [
  body(
    "filepaths",
    message((LL) => LL.PUBLIC_CASE.ROUTE.OPTIONAL_ATTACHMENT()),
  )
    .optional()
    .isArray({ min: 1 }),
  body(
    "filepaths.*",
    message((LL) => LL.PUBLIC_CASE.ROUTE.OPTIONAL_ATTACHMENT()),
  )
    .optional()
    .isString()
    .notEmpty(),
];
export const validateOptionalsFilepathsAreInStaleContent = custom(
  async (req, LL) => {
    const { filepaths } = req.body;

    if (filepaths === undefined) return;

    const foundContent = [
      ...(await StaleContent.find({
        filepath: { $in: filepaths },
      })),
    ];

    const notFoundContent = filepaths.filter((filepath) => {
      const found = foundContent.find(
        (content) => content.filepath === filepath,
      );

      return !found;
    });

    if (notFoundContent.length > 0) {
      throw new StaleContentNotFoundError(
        LL.STALE_CONTENT.ROUTE.NOT_FOUND({
          paths: notFoundContent.join(", "),
        }),
      );
    }
  },
);
