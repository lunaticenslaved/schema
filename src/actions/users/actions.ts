import toQueryString from 'to-querystring';

import { OperationResponse } from '../../models';
import { client } from '../../utils';

import { GetUserRequest, GetUserResponse, ListUserRequest, ListUserResponse } from './types';

export const actions = {
  get: client.createAction<OperationResponse<GetUserResponse>, GetUserRequest>({
    method: 'GET',
    endpoint: 'authApi',
    path: ({ userId }) => `/users/${userId}`,
  }),
  list: client.createAction<OperationResponse<ListUserResponse>, ListUserRequest>({
    method: 'GET',
    endpoint: 'authApi',
    path: data =>
      `/users?${toQueryString({
        userIds: data.userIds,
      })}`,
  }),
};
