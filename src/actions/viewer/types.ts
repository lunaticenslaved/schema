import { User } from '../../models';

export interface UpdateAvatarRequest {
  fileBase64: string;
  mimetype: string;
  filename: string;
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
