import { User } from '../../models';

export interface AuthResponse {
  user: User;
  token: string;
  tokenExpiresAt: string;
}

export interface ActivateRequest {
  activationToken: string;
}
export interface ActivateResponse {
  user: User;
}

export type RefreshResponse = AuthResponse;

export type SignInResponse = AuthResponse;
export interface SignInRequest {
  login: string;
  password: string;
}

export type SignUpResponse = AuthResponse;
export interface SignUpRequest {
  login: string;
  email: string;
  password: string;
}
