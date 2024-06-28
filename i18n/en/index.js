// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

/** @satisfies { BaseTranslation } */
const en = {
  HI: "Hello World!",
  GENERAL: {
    ROUTE: {
      OPTIONAL_PAGE_QUERY:
        "If provided, page query must be an integer greater than 0",
      OPTIONAL_LIMIT_QUERY:
        "If provided, limit query must be an integer greater than 0",
      ENDPOINT_NOT_FOUND: "Endpoint not found",
      INVALID_REQUEST: "Invalid request",
    },
  },
  LOCATION: {
    ROUTE: {
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
      ADDRESS_REQUIRED:
        "Address is required and must be a string with a minimum length of 3 characters",
      CITY_REQUIRED:
        "City is required and must be a string with a minimum length of 3 characters",
      COUNTRY_REQUIRED:
        "Country is required and must be a string with a minimum length of 3 characters",
      INCOMPLETE_COORDINATES:
        "If one either latitude or longitude is provided, both must be provided",
    },
    ERROR: {},
  },
  PUBLIC_CASE: {
    CONTROLLER: {
      GET_FEED_SUCCESS: "Successfully got feed public cases",
      CREATED: "Successfully created public case",
      DELETED: "Successfully deleted public case",
    },
    ROUTE: {
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
  USER: {
    CONTROLLER: {
      GET_ALL_USERS_SUCCESS: "All users retrieved successfully",
      GET_USER_SUCCESS: "User retrieved successfully",
      DELETE_USER_SUCCESS: "User deleted successfully",
    },
    ROUTE: {
      USER_ID_REQUIRED:
        "The URL must include a valid MongoDB ObjectId representing the user id.",
    },
    ERROR: {
      NOT_FOUND: "User not found",
      USERNAME_ALREADY_EXISTS:
        "Username already exists, username must be unique",
      EMAIL_ALREADY_EXISTS: "Email already exists, email must be unique",
    },
  },
  AUTH: {
    CONTROLLER: {
      LOGIN_SUCCESS: "User logged in successfully",
      LOGOUT_SUCCESS: "User logged out successfully",
      REGISTER_SUCCESS: "User registered successfully",
      DELETE_USER_SUCCESS: "User deleted successfully",
    },
    ROUTE: {
      USERNAME_REQUIRED:
        "Username is required and must be a string with a minimum length of 3 characters",
      EMAIL_REQUIRED: "Email is required and must be a valid email address",
      USERNAME_OPTIONAL:
        "If provided, username must be a string with a minimum length of 3 characters",
      EMAIL_OPTIONAL: "If provided, email must be a valid email address",
      PASSWORD_REQUIRED:
        "Password is required and must be a string with a minimum length of 8 characters," +
        " must have 1 lowercase letter, 1 uppercase letter and 1 number",
      USER_ID_REQUIRED:
        "The URL must include a valid MongoDB ObjectId representing the user id.",
      EITHER_USERNAME_OR_EMAIL_REQUIRED:
        "Either username or email is required, the email must be a valid email address, and the username must be a string at least 3 characters long",
      NAME_REQUIRED:
        "Name is required and must be a string with at least 2 characters",
      LASTNAME_REQUIRED:
        "Lastname is required and must be a string with at least 2 characters",
    },
    ERROR: {
      NOT_FOUND: "User not found",
      INVALID_CREDENTIALS: "Invalid credentials",
    },
  },
};

export default en;
