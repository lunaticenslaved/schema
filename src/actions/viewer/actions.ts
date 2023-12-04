import { client } from '../../utils';

import {
  GetViewerResponse,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
  UpdateInfoRequest,
  UpdateInfoResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from './types';

export const actions = {
  get: client.createAction<GetViewerResponse>({
    endpoint: 'authApi',
    path: '/viewer/get',
  }),
  updateAvatar: client.createAction<UpdateAvatarResponse, UpdateAvatarRequest>({
    endpoint: 'authApi',
    path: '/viewer/update-avatar',
  }),
  updateInfo: client.createAction<UpdateInfoResponse, UpdateInfoRequest>({
    endpoint: 'authApi',
    path: '/viewer/update-info',
  }),
  updatePassword: client.createAction<UpdatePasswordResponse, UpdatePasswordRequest>({
    endpoint: 'authApi',
    path: '/viewer/update-password',
  }),
};
