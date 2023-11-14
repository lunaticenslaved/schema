import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client, Validators } from '#/utils';

export type SignUpRequest = {
  login: string;
  password: string;
};

export type SignUpResponse = {
  user: User;
};

export const validators = {
  login: Validators.login,
  password: Validators.newPassword,
};

export const operation = Client.createOperation<SignUpResponse, SignUpRequest>({
  method: 'post',
  path: Endpoint.create('authApi', '/auth/sign-up'),
});
