import { StatusCodes } from "http-status-codes";

export class StaleContentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = "StaleContentNotFoundError";
  }
}

export class StaleContentFailedToRemoveError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = "StaleContentFailedToRemoveError";
  }
}

export class StaleContentAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
    this.name = "StaleContentAlreadyExistsError";
  }
}
