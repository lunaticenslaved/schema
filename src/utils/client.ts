import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiError, Errors } from '../errors';

import { merge } from './lodash';

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

export type Action<TResponse, TRequest> = {
  (args: ActionProps<TRequest> | undefined, type: 'raw'): Promise<AxiosResponse<TResponse>>;
  (args?: ActionProps<TRequest>, type?: undefined): Promise<TResponse>;
};

export type Method = 'POST';

export type OperationResponse<TData> =
  | {
      data: TData;
      error: null;
    }
  | {
      data: null;
      error: ApiError;
    };

export class Client {
  private axios: AxiosInstance = axios.create();

  setAxios(ax: AxiosInstance) {
    this.axios = ax;
  }

  isOperation<T>(obj: unknown): obj is OperationResponse<T> {
    if (!obj) return false;
    if (typeof obj !== 'object') return false;

    return 'data' in obj && 'error' in obj;
  }

  isAxiosResponse<T>(obj: unknown): obj is AxiosResponse<T> {
    if (!obj) return false;
    if (typeof obj !== 'object') return false;

    return 'headers' in obj && 'status' in obj && 'statusText' in obj;
  }

  unwrapOperation<TResponse = void>(response: OperationResponse<TResponse>) {
    let responseData: unknown = {};

    if (this.isAxiosResponse(response)) {
      responseData = response.data;
    }

    if (this.isOperation(responseData)) {
      const { data, error } = responseData;

      if (error) {
        throw Errors.parse(error);
      }

      return data as TResponse;
    }

    return response as TResponse;
  }

  createAction<TResponse = void, TRequest = void>({
    method,
    path,
    config,
  }: CreateActionProps): Action<TResponse, TRequest> {
    return async (args, type) => {
      const { data, config: configLocal, token } = args || {};

      if (method === 'POST') {
        try {
          const headers = merge(config?.headers, configLocal?.headers) || {};

          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          const response = await this.axios.post<TResponse>(
            path,
            data,
            merge(config, configLocal, { headers }),
          );

          if (type === 'raw') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return response as any;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return response.data as any;
        } catch (error) {
          throw Errors.parse(error);
        }
      }

      throw new Error('Unknown method');
    };
  }
}

export const client = new Client();
