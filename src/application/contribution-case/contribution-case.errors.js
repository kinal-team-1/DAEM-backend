import { StatusCodes } from "http-status-codes";

export class ContributionCaseNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = "ContributionCaseNotFoundError";
  }
}

export class ContributionCaseFailedToUploadImagesError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = "ContributionCaseFailedToUploadImagesError";
  }
}
