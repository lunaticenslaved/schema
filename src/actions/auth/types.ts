import { User } from '../../models';

export interface ActivateRequest {
  activationToken: string;
}
export interface ActivateResponse {
  user: User;
}

export interface RefreshResponse {
  user: User;
  token: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}

export interface SignUpRequest {
  login: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: User;
  token: string;
}
