import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client, Validators } from '#/utils';

export interface Request {
  login: string;
  password: string;
}

export interface Response {
  user: User;
}

export const validators = {
  login: Validators.login,
  password: Validators.newPassword,
};

export function operation(data: Request) {
  return Client.post(Endpoint.create('authApi', '/auth/sign-in'), data);
}
