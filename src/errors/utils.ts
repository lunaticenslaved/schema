import { AxiosError } from 'axios';

import {
  ApiError,
  ApiErrorType,
  ConflictError,
  FileNotProvidedError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
  ValidationError,
} from './module';

const map: Record<ApiErrorType, typeof UnknownError> = {
  [ApiErrorType.ConflictError]: ConflictError,
  [ApiErrorType.FileNotProvidedError]: FileNotProvidedError,
  [ApiErrorType.NotFoundError]: NotFoundError,
  [ApiErrorType.UnauthorizedError]: UnauthorizedError,
  [ApiErrorType.UnknownError]: UnknownError,
  [ApiErrorType.ValidationError]: ValidationError,
};

export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== 'object') return false;
  if (!error) return false;
  if (!('type' in error)) return false;
  if (!('messages' in error)) return false;
  if (!('status' in error)) return false;

  return Object.values(ApiErrorType).includes(error.type as ApiErrorType);
}

export function parse(error: unknown) {
  if (typeof error === 'string') {
    return new UnknownError({ messages: error });
  }

  if (typeof error !== 'object' || !error) {
    return new UnknownError({ messages: 'Unknown error' });
  }

  if (isApiError(error)) {
    return new map[error.type as ApiErrorType]({
      messages: error.messages,
      status: error.status,
    });
  }

  if (error instanceof AxiosError) {
    const operationError = error.response?.data.error;

    if (operationError && isApiError(operationError)) {
      return new map[operationError.type]({
        messages: operationError.messages,
        status: operationError.status,
      });
    }

    return new UnknownError({
      messages: error.message,
      status: error.status || error.response?.status,
    });
  }

  if (error instanceof Error) {
    return new UnknownError({ messages: error.message });
  }

  return new UnknownError({ messages: 'Unknown error' });
}
