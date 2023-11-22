import { client } from '../../utils';

export const operation = client.createAction({
  method: 'POST',
  endpoint: 'authApi',
  path: '/auth/logout',
});
