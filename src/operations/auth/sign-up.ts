import { Validators } from '#';
import { Client } from '#/utils/client';
import { User } from '#/models';
import { Endpoint } from '#/endpoints';

export type Request = {
  login: string;
  password: string;
};

export type Response = {
  user: User;
};

export const validators = {
  login: Validators.login,
  password: Validators.newPassword,
};

export function operation(data: Request) {
  return Client.post(Endpoint.create('authApi', '/auth/sign-up'), data);
}
