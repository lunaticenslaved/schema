import { User } from '../../models';
import { OperationResponse, Validators, client } from '../../utils';

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}

export const validators = {
  login: Validators.login,
  password: Validators.newPassword,
};

export const action = client.createAction<OperationResponse<SignInResponse>, SignInRequest>({
  method: 'POST',
  endpoint: 'authApi',
  path: '/auth/sign-in',
});
