import { StatusCodes } from "http-status-codes";

export class LocationIncompleteCoordinatesError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = "LocationIncompleteCoordinatesError";
  }
}
