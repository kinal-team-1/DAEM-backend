import { body } from "express-validator";
import { message } from "../utils/message.js";

export const locationValidation = [
  body(
    "latitude",
    message((LL) => LL.LOCATION.ROUTE.LATITUDE_REQUIRED()),
  )
    .isFloat({ min: -90, max: 90 })
    .toFloat(),
  body(
    "longitude",
    message((LL) => LL.LOCATION.ROUTE.LONGITUDE_REQUIRED()),
  )
    .isFloat({ min: -180, max: 180 })
    .toFloat(),
  body(
    "address",
    message((LL) => LL.LOCATION.ROUTE.ADDRESS_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),
  body(
    "city",
    message((LL) => LL.LOCATION.ROUTE.CITY_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),
  body(
    "country",
    message((LL) => LL.LOCATION.ROUTE.COUNTRY_REQUIRED()),
  )
    .isString()
    .isLength({ min: 3 }),
];
