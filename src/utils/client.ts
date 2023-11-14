import axios, { AxiosRequestConfig } from 'axios';

import { Errors } from '#/errors';
import { OperationResponse } from '#/operations';

export type ClientRequest<TData> = {
  path: string;
  data?: TData;
  config?: AxiosRequestConfig;
};

export type CreateActionProps<TRequest> = {
  method: Method;
  path: string;
  config?: ClientRequest<TRequest>['config'];
};

export type Method = 'post';

function post<TResponse = void, TRequest = void>(props: ClientRequest<TRequest>) {
  return axios.post<TResponse>(props.path, props.data, props.config);
}

export const Client = {
  createOperation<TResponse = void, TRequest = void>(args: CreateActionProps<TRequest>) {
    const action = this.createAction<OperationResponse<TResponse>, TRequest>(args);

    return async (data: TRequest, configLocal?: ClientRequest<TRequest>['config']) => {
      const response = await action(data, configLocal);

      if ('data' in response) {
        return response.data;
      }

      throw response.error;
    };
  },
  createAction<TResponse = void, TRequest = void>({
    method,
    path,
    config,
  }: CreateActionProps<TRequest>) {
    return async (
      data: TRequest,
      configLocal?: ClientRequest<TRequest>['config'],
    ): Promise<TResponse> => {
      if (method === 'post') {
        try {
          const response = await post<TResponse, TRequest>({
            path,
            data,
            config: {
              ...config,
              ...configLocal,
            },
          });

          return response.data;
        } catch (error) {
          throw Errors.parse(error);
        }
      }

      throw new Error('Unknown method');
    };
  },
};
