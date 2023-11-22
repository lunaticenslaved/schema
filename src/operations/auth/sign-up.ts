import { OperationResponse, User } from '../../models';
import { Validators, client } from '../../utils';

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
  endpoint: 'authApi',
  path: '/auth/sign-up',
});
