import { Schema } from '#';
import { Client } from '#/utils/client';
import { User } from '#/models';
import { Endpoint } from '#/endpoints';

export interface Request {
  login: string;
  password: string;
}

export interface Response {
  user: User;
}

export const validators = {
  login: Schema.Validators.login,
  password: Schema.Validators.newPassword,
};

export function operation(data: Request) {
  return Client.post(Endpoint.create('authApi', '/auth/sign-in'), data);
}
