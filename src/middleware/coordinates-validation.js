import { body } from "express-validator";
import { message } from "../utils/message.js";

export const bodyHasCoordinates = [
  body(
    "latitude",
    message((LL) => LL.LOCATION.ROUTES.LATITUDE_REQUIRED()),
  )
    .isFloat({ min: -90, max: 90 })
    .toFloat(),
  body(
    "longitude",
    message((LL) => LL.LOCATION.ROUTES.LONGITUDE_REQUIRED()),
  )
    .isFloat({ min: -180, max: 180 })
    .toFloat(),
];
