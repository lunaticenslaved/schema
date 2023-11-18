import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiError, Errors } from '#/errors';

import { merge } from './lodash';

export type ClientRequest<TData> = {
  path: string;
  config?: AxiosRequestConfig;
  data?: TData;
};

export type CreateActionProps = {
  config?: AxiosRequestConfig;
  method: Method;
  path: string;
};

export type ActionProps<TData> = {
  data?: TData;
  config?: AxiosRequestConfig;
  token?: string;
};

export type Operation<TResponse, TRequest> = {
  (args?: ActionProps<TRequest>): Promise<AxiosResponse<OperationResponse<TResponse>>>;
};

export type Action<TResponse, TRequest> = {
  (args?: ActionProps<TRequest>): Promise<AxiosResponse<TResponse>>;
};

export type Method = 'post';

export type OperationResponse<TData> =
  | {
      data: TData;
      error: null;
    }
  | {
      data: null;
      error: ApiError;
    };

export function isOperation<T>(obj: unknown): obj is OperationResponse<T> {
  if (!obj) return false;
  if (typeof obj !== 'object') return false;

  return 'data' in obj && 'error' in obj;
}

function post<TResponse = void, TRequest = void>(props: ClientRequest<TRequest>) {
  return axios.post<TResponse>(props.path, props.data, props.config);
}

export const Client = {
  unwrapOperation<TResponse = void>(response: OperationResponse<TResponse>) {
    const { data, error } = response;

    if (error) {
      throw Errors.parse(error);
    }

    return data as TResponse;
  },

  createOperation<TResponse = void, TRequest = void>(
    args: CreateActionProps,
  ): Operation<TResponse, TRequest> {
    return this.createAction<OperationResponse<TResponse>, TRequest>(args);
  },

  createAction<TResponse = void, TRequest = void>({
    method,
    path,
    config,
  }: CreateActionProps): Action<TResponse, TRequest> {
    return async args => {
      const { data, config: configLocal, token } = args || {};

      if (method === 'post') {
        try {
          const headers = merge(config?.headers, configLocal?.headers) || {};

          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          const response = await post<TResponse, TRequest>({
            path,
            data,
            config: merge(config, configLocal, { headers }),
          });

          return response;
        } catch (error) {
          throw Errors.parse(error);
        }
      }

      throw new Error('Unknown method');
    };
  },
};
