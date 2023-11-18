import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client } from '#/utils';

export type RefreshResponse = {
  user: User;
  token: string;
};

export const operation = Client.createOperation<RefreshResponse>({
  method: 'post',
  path: Endpoint.create('authApi', '/auth/refresh'),
});
