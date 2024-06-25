// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

/** @satisfies { BaseTranslation } */
const en = {
  HI: "Hello World!",
  GENERAL: {
    ROUTES: {
        ENDPOINT_NOT_FOUND: "Endpoint not found",
        INVALID_OPTIONAL_LIMIT: "If provided, limit must be a valid positive integer",
        INVALID_OPTIONAL_PAGE: "If provided, page must be a valid positive integer",
        INVALID_MONGO_ID: "Invalid mongo id",
        INTERNAL_SERVER_ERROR: "Internal server error",
    },
    DB: {
        TP_STATUS_REQUIRED: "The tp_status is required",
        CREATED_AT_REQUIRED: "The created_at is required",
    }
  },
  CURRENCY:{
      ERROR: {
          CURRENCY_ALREADY_EXIST: "Currency already exists",
          CURRENCY_NOT_FOUND: "Currency not found",
          SYMBOL_ALREADY_EXISTS: "A Currency with this symbol already exists",
          NAME_ALREADY_EXISTS: "A Currency with this name already exists",
          KEY_ALREADY_EXISTS: "A Currency with this key already exists",
      },
      DB: {
          CURRENCY_REQUIRED: "Currency is required",
          SYMBOL_REQUIRED: "Symbol is required",
          NAME_REQUIRED: "The name is required",
          KEY_REQUIRED: "The key is required",

      },
      ROUTES: {
          INVALID_SYMBOL: "Symbol is invalid",
          INVALID_NAME: "Name is invalid",
          INVALID_KEY: "Key is invalid",
          INVALID_OPTIONAL_SYMBOL: "If provided, symbol must be a valid",
          INVALID_OPTIONAL_NAME: "If provided, name must be a valid",
          INVALID_OPTIONAL_KEY: "If provided, key must be a valid",
      },
      CONTROLLER: {
          MULTIPLE_RETRIEVED_SUCCESSFULLY: "Currencies retrieved successfully",
          DELETED: "Currency deleted successfully",
          CREATED: "Currency created successfully",
          UPDATED: "Currency update successfully",
      }
  },
};

export default en;
