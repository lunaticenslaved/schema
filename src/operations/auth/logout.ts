import { Endpoint } from '../../endpoints';
import { client } from '../../utils';

export const operation = client.createAction({
  method: 'POST',
  path: Endpoint.create('authApi', '/auth/logout'),
});
