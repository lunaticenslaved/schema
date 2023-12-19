import { AxiosResponse } from 'axios';

import { Errors } from '../errors';
import { OperationResponse } from '../models';

function isOperationResponse<T>(obj: unknown): obj is OperationResponse<T> {
  if (!obj) return false;
  if (typeof obj !== 'object') return false;

  return 'data' in obj && 'error' in obj;
}

function isAxiosResponse<T>(obj: unknown): obj is AxiosResponse<T> {
  if (!obj) return false;
  if (typeof obj !== 'object') return false;

  return 'headers' in obj && 'status' in obj && 'statusText' in obj;
}

function unwrapResponse<TResponse = void>(
  response: AxiosResponse<TResponse> | OperationResponse<TResponse>,
): TResponse {
  let responseData: unknown = response;

  if (isAxiosResponse(response)) {
    responseData = response.data;
  }

  if (isOperationResponse(responseData)) {
    const { data, error } = responseData;

    if (error) {
      throw Errors.parse(error);
    }

    return data as TResponse;
  }

  return response as TResponse;
}

export const ResponseUtils = {
  isAxiosResponse,
  isOperationResponse,
  unwrapResponse,
};
