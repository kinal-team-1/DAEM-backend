import { StatusCodes } from "http-status-codes";

export class AttachmentCreateUploadSignedUrlError extends Error {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = "AttachmentCreateUploadSignedUrlError";
  }
}

export class AttachmentCreateGetSignedUrlError extends Error {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = "AttachmentCreateGetSignedUrlError";
  }
}

export class AttachmentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
    this.name = "AttachmentNotFoundError";
  }
}
