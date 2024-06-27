import { StatusCodes } from "http-status-codes";

export class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = "UserNotFoundError";
  }
}
