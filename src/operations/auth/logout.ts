import { Endpoint } from '#/endpoints';
import { Client } from '#/utils';

export const operation = Client.createOperation({
  method: 'post',
  path: Endpoint.create('authApi', '/auth/logout'),
});
