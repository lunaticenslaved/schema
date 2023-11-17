import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client, Validators } from '#/utils';

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  accessToken: string;
}

export const validators = {
  login: Validators.login,
  password: Validators.newPassword,
};

export const operation = Client.createOperation<SignInResponse, SignInRequest>({
  method: 'post',
  path: Endpoint.create('authApi', '/auth/sign-in'),
});
