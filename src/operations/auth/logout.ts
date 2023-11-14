import { Endpoint } from '#/endpoints';
import { Client } from '#/utils';

export const action = Client.createOperation({
  method: 'post',
  path: Endpoint.create('authApi', '/auth/logout'),
});
