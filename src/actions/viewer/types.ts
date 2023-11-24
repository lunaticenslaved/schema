import { User } from '../../models';

export interface UpdateAvatarRequest {
  avatar: object;
}
export interface UpdateAvatarResponse {
  user: User;
}

export interface UpdateInfoRequest {
  login: string;
}
export interface UpdateInfoResponse {
  user: User;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface UpdatePasswordResponse {
  user: User;
}

export interface GetViewerResponse {
  user: User;
}
