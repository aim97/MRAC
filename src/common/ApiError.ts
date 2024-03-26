import httpStatus from "http-status";

export enum ErrorCode {
  // bad user input
  NotFound = "NotFound",
  ValidationError = "ValidationError",
  BadUserInput = "BadUserInput",
  // Access denied
  UnAuthenticated = "UnAuthenticated",
  UnAuthorized = "UnAuthorized",
  // ServerError
  ServerError = "ServerError",
}

const errorStatusMap: Record<ErrorCode, number> = {
  [ErrorCode.NotFound]: httpStatus.NOT_FOUND,
  [ErrorCode.ValidationError]: httpStatus.BAD_REQUEST,
  [ErrorCode.UnAuthenticated]: httpStatus.UNAUTHORIZED,
  [ErrorCode.UnAuthorized]: httpStatus.UNAUTHORIZED,
  [ErrorCode.BadUserInput]: httpStatus.BAD_REQUEST,
  [ErrorCode.ServerError]: httpStatus.INTERNAL_SERVER_ERROR,
};

export class ApiError extends Error {
  public status: Readonly<number>;
  constructor(
    public errorCode: Readonly<ErrorCode>,
    message: Readonly<string>,
  ) {
    super(message);
    this.status = errorStatusMap[errorCode];
  }
}
