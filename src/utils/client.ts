import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Endpoints, EndpointsMap, endpoints } from '../endpoints';
import { Errors } from '../errors';

import { merge } from './lodash';

export type CreateActionProps<TData, TEndpointsMap extends EndpointsMap> = {
  config?: AxiosRequestConfig;
  method: Method;
  path: string | ((data: TData) => string);
  endpoint: keyof TEndpointsMap;
};

export type ActionProps<TData> = {
  data?: TData;
  config?: AxiosRequestConfig;
  token?: string;
};

export type Action<TResponse, TRequest> = {
  (args: ActionProps<TRequest> | undefined | null, type: 'raw'): Promise<AxiosResponse<TResponse>>;
  (args?: ActionProps<TRequest>, type?: undefined): Promise<TResponse>;

  isAction: boolean;
};

export type Method = 'POST' | 'GET';

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
    method,
    path: uri,
    config,
    endpoint,
  }: CreateActionProps<TRequest, TEndpointsMap>): Action<TResponse, TRequest> {
    const action: Action<TResponse, TRequest> = async (args, type) => {
      const { data, config: configLocal, token } = args || {};
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

        let response: AxiosResponse<TResponse> | undefined;

        if (method === 'POST') {
          response = await this.axios.post<TResponse>(path, data, actualConfig);
        } else if (method === 'GET') {
          response = await this.axios.get<TResponse>(path, actualConfig);
        }

        if (!response) {
          throw new Error('Response in required!');
        }

        if (type === 'raw') {
          return response;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.data as any;
      } catch (error) {
        throw Errors.parse(error);
      }
    };

    action.isAction = true;

    return action;
  }
}

export const client = new Client(endpoints);
