import { Service, User } from '../../models';

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export interface ActivateRequest {
  activationToken: string;
}
export interface ActivateResponse {
  user: User;
}

export type RefreshResponse = AuthResponse;
export interface RefreshRequest {
  fingerprint: string;
}

export type SignInResponse = AuthResponse;
export interface SignInRequest {
  login: string;
  password: string;
  fingerprint: string;
}

export type SignUpResponse = AuthResponse;
export interface SignUpRequest {
  login: string;
  email: string;
  password: string;
  fingerprint: string;
}

export type ValidateRequestResponse = AuthResponse;
export type ValidateRequestRequest = {
  service: Service;
};
