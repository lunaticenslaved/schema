export enum ApiErrorType {
  ValidationError = 'ValidationError',
  UnknownError = 'UnknownError',
  UnauthorizedError = 'UnauthorizedError',
  ConflictError = 'ConflictError',
  NotFoundError = 'NotFoundError',
  FileNotProvidedError = 'FileNotProvidedError',
  ExpiredTokenError = 'ExpiredTokenError',
  InvalidTokenError = 'InvalidTokenError',
}

type ApiErrorProps = {
  messages?: string[] | string;
  status?: number;
};

export abstract class ApiError extends Error {
  public abstract type: ApiErrorType;
  public messages: string[] = [];
  public status: number = 500;

  constructor({ messages, status }: ApiErrorProps) {
    super();

    this.messages = typeof messages === 'string' ? [messages] : messages || [];

    if (status) {
      this.status = status;
    }
  }
}
