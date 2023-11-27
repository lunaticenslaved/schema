import toQueryString from 'to-querystring';

import { OperationResponse } from '../../models';
import { client } from '../../utils';

import { GetUserRequest, GetUserResponse, ListUsersRequest, ListUsersResponse } from './types';

export const actions = {
  get: client.createAction<OperationResponse<GetUserResponse>, GetUserRequest>({
    method: 'GET',
    endpoint: 'authApi',
    path: ({ userId }) => `/users/${userId}`,
  }),
  list: client.createAction<OperationResponse<ListUsersResponse>, ListUsersRequest>({
    method: 'GET',
    endpoint: 'authApi',
    path: data => `/users?${toQueryString(data)}`,
  }),
};
