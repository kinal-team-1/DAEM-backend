import { body, oneOf, query } from "express-validator";
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

export const locationSearchQueryParams = [
  query(
    "lat",
    message((LL) => LL.LOCATION.ROUTE.OPTIONAL_LATITUDE()),
  )
    .optional()
    .isFloat({ min: -90, max: 90 })
    .toFloat(),

  query(
    "long",
    message((LL) => LL.LOCATION.ROUTE.OPTIONAL_LONGITUDE()),
  )
    .optional()
    .isFloat({ min: -180, max: 180 })
    .toFloat(),
  query(
    "radius",
    message((LL) => LL.LOCATION.ROUTE.OPTIONAL_RADIUS()),
  )
    .optional()
    .isInt({ min: 1 })
    .toInt(10),
  // either lat and long are both defined or both missing
  oneOf(
    [
      [query("lat").exists(), query("long").exists()],
      [query("lat").not().exists(), query("long").not().exists()],
    ],
    {
      message: message((LL) => LL.LOCATION.ROUTE.INCOMPLETE_COORDINATES()),
    },
  ),
];
