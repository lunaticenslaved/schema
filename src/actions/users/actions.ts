import { client } from '../../utils';

import { GetUserRequest, GetUserResponse, ListUsersRequest, ListUsersResponse } from './types';

export const actions = {
  get: client.createAction<GetUserResponse, GetUserRequest>({
    endpoint: 'authApi',
    path: `/users/get`,
  }),
  list: client.createAction<ListUsersResponse, ListUsersRequest>({
    endpoint: 'authApi',
    path: `/users/list`,
  }),
};
