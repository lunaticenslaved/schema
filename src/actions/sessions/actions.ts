import { client } from '../../utils';

import { ListSessionsResponse } from './types';

export const actions = {
  list: client.createAction<ListSessionsResponse, void>({
    endpoint: 'authApi',
    path: '/sessions/list',
  }),
};
