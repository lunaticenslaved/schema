export enum ApiErrorType {
  ValidationError = 'ValidationError',
  UnknownError = 'UnknownError',
  AuthenticationError = 'AuthenticationError',
  UnauthorizedError = 'UnauthorizedError',
  ConflictError = 'ConflictError',
  NotFoundError = 'NotFoundError',
  FileNotProvidedError = 'FileNotProvidedError',
}

type ApiErrorProps = {
  messages: string[] | string;
  status?: number;
};

export abstract class ApiError extends Error {
  public abstract type: ApiErrorType;
  public messages: string[] = [];
  public status: number = 500;

  constructor({ messages, status = 500 }: ApiErrorProps) {
    super();

    this.messages = typeof messages === 'string' ? [messages] : messages;
    this.status = status;
  }
}
