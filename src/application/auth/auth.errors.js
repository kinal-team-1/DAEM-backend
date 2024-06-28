import { StatusCodes } from "http-status-codes";

export class AuthInvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.name = "AuthInvalidCredentialsError";
  }
}
