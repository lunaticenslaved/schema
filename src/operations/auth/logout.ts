import { Endpoint } from '#/endpoints';
import { Client } from '#/utils/client';

export function operation() {
  return Client.post(Endpoint.create('authApi', '/auth/logout'));
}
