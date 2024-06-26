// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

/** @satisfies { BaseTranslation } */
const en = {
  HI: "Hello World!",
  LOCATION: {
    ROUTES: {
      OPTIONAL_LATITUDE:
        "If provided, latitude must be a float between -90 and 90",
      OPTIONAL_LONGITUDE:
        "If provided, longitude must be a float between -180 and 180",
      OPTIONAL_RADIUS:
        "If provided radius must be an integer greater than 0 representing the distance in kilometers from the provided latitude and longitude coordinates",
      LATITUDE_REQUIRED:
        "Latitude is required and must be a float between -90 and 90",
      LONGITUDE_REQUIRED:
        "Longitude is required and must be a float between -180 and 180",
    },
  },
  PUBLIC_CASE: {
    CONTROLLER: {
      GET_FEED_SUCCESS: "Successfully got feed public cases",
      CREATED: "Successfully created public case",
      DELETED: "Successfully deleted public case",
    },
    ROUTES: {
      TITLE_REQUIRED:
        "Title is required and must be a string between 5 and 100 characters",
      DESCRIPTION_REQUIRED:
        "Description is required and must be a string with a minimum length of 20 characters",
      SUBMITTER_REQUIRED:
        "Submitter is required and must be a valid MongoDB ObjectId",
      PUBLIC_CASE_ID_REQUIRED:
        "The URL must include a valid MongoDB ObjectId representing the public case id.",
    },
    ERROR: {
      NOT_FOUND: "Public case not found",
    },
  },
  GENERAL: {
    ROUTES: {
      OPTIONAL_PAGE_QUERY:
        "If provided, page query must be an integer greater than 0",
      OPTIONAL_LIMIT_QUERY:
        "If provided, limit query must be an integer greater than 0",
    },
  },
};

export default en;
