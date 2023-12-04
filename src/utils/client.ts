import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Endpoints, EndpointsMap, endpoints } from '../endpoints';
import { Errors } from '../errors';
import { OperationResponse } from '../models';

import { merge } from './lodash';
import { ResponseUtils } from './response';

export type CreateActionProps<TData, TEndpointsMap extends EndpointsMap> = {
  config?: AxiosRequestConfig;
  path: string | ((data: TData) => string);
  endpoint: keyof TEndpointsMap;
};

export type ActionProps<TData> = {
  data: TData;
  config?: AxiosRequestConfig;
  token?: string;
};

export type Action<TResponse, TRequest> = {
  (
    args: ActionProps<TRequest> | undefined | null,
    type: 'raw',
  ): Promise<AxiosResponse<OperationResponse<TResponse>>>;
  (
    args: ActionProps<TRequest> | undefined | null,
    type: 'operation',
  ): Promise<OperationResponse<TResponse>>;
  (args?: ActionProps<TRequest>, type?: undefined): Promise<TResponse>;

  isAction: boolean;
};

export class Client<TEndpointsMap extends EndpointsMap> {
  axios: AxiosInstance;
  endpoints: Endpoints<TEndpointsMap>;

  constructor(initialEndpoints: Endpoints<TEndpointsMap>) {
    this.endpoints = initialEndpoints;
    this.axios = axios.create();
  }

  setAxios(ax: AxiosInstance) {
    this.axios = ax;
  }

  setEndpoints(newEndpoints: Endpoints<TEndpointsMap>) {
    this.endpoints = newEndpoints;
  }

  createAction<TResponse = void, TRequest = void>({
    path: uri,
    config,
    endpoint,
  }: CreateActionProps<TRequest, TEndpointsMap>): Action<TResponse, TRequest> {
    const action: Action<TResponse, TRequest> = async (args, type) => {
      const { config: configLocal, token } = args || {};
      const data = args && 'data' in args ? args.data : {};
      const path = this.endpoints.createPath(
        endpoint,
        typeof uri === 'string' ? uri : uri(data as TRequest),
      );

      try {
        const headers = merge(config?.headers, configLocal?.headers) || {};

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const actualConfig = merge(config, configLocal, { headers });
        const response = await this.axios.post<TResponse>(path, data, actualConfig);

        if (!response) {
          throw new Error('Response in required!');
        }

        if (type === 'raw') {
          return response;
        }

        const responseData = response.data as OperationResponse<TResponse>;

        if (type === 'operation') {
          return responseData;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ResponseUtils.unwrapResponse(responseData) as any;
      } catch (error) {
        throw Errors.parse(error);
      }
    };

    action.isAction = true;

    return action;
  }
}

export const client = new Client(endpoints);
