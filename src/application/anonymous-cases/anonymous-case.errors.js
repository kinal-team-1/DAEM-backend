import { StatusCodes } from "http-status-codes";

export class AnonymousCaseNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = "AnonymousCaseNotFound";
  }
}

export class AnonymousCaseFailedToUploadImagesError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = "AnonymousCaseFailedToUploadImages";
  }
}
