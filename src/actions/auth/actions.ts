import { OperationResponse } from '../../models';
import { client } from '../../utils';

import {
  ActivateRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './types';

export const actions = {
  activate: client.createAction<OperationResponse, ActivateRequest>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/auth/activate',
  }),
  logout: client.createAction({
    method: 'POST',
    endpoint: 'authApi',
    path: '/auth/logout',
  }),
  refresh: client.createAction<OperationResponse<RefreshResponse>>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/auth/refresh',
  }),
  resendEmail: client.createAction<OperationResponse>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/auth/resend-email',
  }),
  signIn: client.createAction<OperationResponse<SignInResponse>, SignInRequest>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/auth/sign-in',
  }),
  signUp: client.createAction<OperationResponse<SignUpResponse>, SignUpRequest>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/auth/sign-up',
  }),
};
