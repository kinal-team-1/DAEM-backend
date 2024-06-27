import { body } from "express-validator";
import { message } from "../utils/message.js";

export const locationValidation = [
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
  body(
    "address",
    message((LL) => LL.LOCATION.ROUTES.ADDRESS_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),
  body(
    "city",
    message((LL) => LL.LOCATION.ROUTES.CITY_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),
  body(
    "country",
    message((LL) => LL.LOCATION.ROUTES.COUNTRY_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),
];
