import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiError, Errors } from '#/errors';

import { merge } from './lodash';

class ActionPromise<TResponse> extends Promise<AxiosResponse<TResponse>> {
  public unwrapResponse() {
    return this.then(({ data }) => {
      return Promise.resolve(data);
    });
  }
}

class OperationPromise<TResponse> extends ActionPromise<OperationResponse<TResponse>> {
  public unwrapOperation() {
    return this.then(response => {
      if ('error' in response.data && response.data.error) {
        throw response.data.error;
      }

      return Promise.resolve(response.data.data);
    });
  }
}

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
  (args?: ActionProps<TRequest>): OperationPromise<TResponse>;
};

export type Action<TResponse, TRequest> = {
  (args?: ActionProps<TRequest>): ActionPromise<TResponse>;
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

function post<TResponse = void, TRequest = void>(props: ClientRequest<TRequest>) {
  return axios.post<TResponse>(props.path, props.data, props.config);
}

export const Client = {
  createOperation<TResponse = void, TRequest = void>(
    args: CreateActionProps,
  ): Operation<TResponse, TRequest> {
    const action = this.createAction<OperationResponse<TResponse>, TRequest>(args);

    return args => {
      const promise = new OperationPromise<TResponse>(() => action(args));

      return promise;
    };
  },
  createAction<TResponse = void, TRequest = void>({
    method,
    path,
    config,
  }: CreateActionProps): Action<TResponse, TRequest> {
    return args => {
      const { data, config: configLocal, token } = args || {};

      if (method === 'post') {
        try {
          const headers = merge(config?.headers, configLocal?.headers) || {};

          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          const promise = new ActionPromise<TResponse>(() =>
            post<TResponse, TRequest>({
              path,
              data,
              config: merge(config, configLocal, { headers }),
            }),
          );

          return promise;
        } catch (error) {
          throw Errors.parse(error);
        }
      }

      throw new Error('Unknown method');
    };
  },
};
