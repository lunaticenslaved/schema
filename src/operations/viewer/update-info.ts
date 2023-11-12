import { Validators } from '#';
import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client } from '#/utils/client';

export type Request = {
  login: string;
};

export type Response = {
  user: User;
};

export const validators = {
  login: Validators.login,
};

export function operation(data: Request) {
  return Client.post(Endpoint.create('authApi', '/viewer/info'), data);
}
