import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Endpoint, EndpointKey } from '../endpoints';
import { Errors } from '../errors';

import { merge } from './lodash';

export type CreateActionProps = {
  config?: AxiosRequestConfig;
  method: Method;
  path: string;
  endpoint: EndpointKey;
};

export type ActionProps<TData> = {
  data?: TData;
  config?: AxiosRequestConfig;
  token?: string;
};

export type Action<TResponse, TRequest> = {
  (args: ActionProps<TRequest> | undefined | null, type: 'raw'): Promise<AxiosResponse<TResponse>>;
  (args?: ActionProps<TRequest>, type?: undefined): Promise<TResponse>;
};

export type Method = 'POST' | 'GET';

export class Client {
  private axios: AxiosInstance = axios.create();

  setAxios(ax: AxiosInstance) {
    this.axios = ax;
  }

  createAction<TResponse = void, TRequest = void>({
    method,
    path: uri,
    config,
    endpoint,
  }: CreateActionProps): Action<TResponse, TRequest> {
    return async (args, type) => {
      const { data, config: configLocal, token } = args || {};
      const path = Endpoint.create(endpoint, uri);

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return response as any;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.data as any;
      } catch (error) {
        throw Errors.parse(error);
      }
    };
  }
}

export const client = new Client();
