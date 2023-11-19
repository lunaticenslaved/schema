import { Endpoint } from '../../endpoints';
import { User } from '../../models';
import { OperationResponse, Validators, client } from '../../utils';

export type SignUpRequest = {
  login: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  user: User;
  token: string;
};

export const validators = {
  login: Validators.login,
  email: Validators.email,
  password: Validators.newPassword,
};

export const action = client.createAction<OperationResponse<SignUpResponse>, SignUpRequest>({
  method: 'POST',
  path: Endpoint.create('authApi', '/auth/sign-up'),
});
