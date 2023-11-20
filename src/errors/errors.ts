import { ApiError, ApiErrorType } from './base-error';

export class ValidationError extends ApiError {
  public type = ApiErrorType.ValidationError;
  public override status = 403;
}

export class UnknownError extends ApiError {
  public type = ApiErrorType.UnknownError;
  public override status = 500;
}

export class UnauthorizedError extends ApiError {
  public type = ApiErrorType.UnauthorizedError;
  public override status = 401;
}

export class ConflictError extends ApiError {
  public type = ApiErrorType.ConflictError;
}

export class NotFoundError extends ApiError {
  public type = ApiErrorType.NotFoundError;
  public override status = 404;
}

export class FileNotProvidedError extends ApiError {
  public type = ApiErrorType.FileNotProvidedError;
}

export class ExpiredTokenError extends ApiError {
  public type = ApiErrorType.ExpiredTokenError;
  public override status = 401;
  public override messages = ['Expired token'];
}

export class InvalidTokenError extends ApiError {
  public type = ApiErrorType.ExpiredTokenError;
  public override status = 401;
  public override messages = ['Invalid token'];
}
