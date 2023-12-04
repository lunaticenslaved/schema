import { client } from '../../utils';

import {
  ActivateRequest,
  ActivateResponse,
  RefreshRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './types';

export const actions = {
  activate: client.createAction<ActivateResponse, ActivateRequest>({
    endpoint: 'authApi',
    path: '/auth/activate',
  }),
  logout: client.createAction({
    endpoint: 'authApi',
    path: '/auth/logout',
  }),
  refresh: client.createAction<RefreshResponse, RefreshRequest>({
    endpoint: 'authApi',
    path: '/auth/refresh',
  }),
  resendEmail: client.createAction<void>({
    endpoint: 'authApi',
    path: '/auth/resend-email',
  }),
  signIn: client.createAction<SignInResponse, SignInRequest>({
    endpoint: 'authApi',
    path: '/auth/sign-in',
  }),
  signUp: client.createAction<SignUpResponse, SignUpRequest>({
    endpoint: 'authApi',
    path: '/auth/sign-up',
  }),
};
