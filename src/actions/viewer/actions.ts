import { OperationResponse } from '../../models';
import { client } from '../../utils';

import {
  UpdateAvatarRequest,
  UpdateAvatarResponse,
  UpdateInfoRequest,
  UpdateInfoResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from './types';

export const actions = {
  updateAvatar: client.createAction<OperationResponse<UpdateAvatarResponse>, UpdateAvatarRequest>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/viewer/avatar',
  }),
  updateInfo: client.createAction<OperationResponse<UpdateInfoResponse>, UpdateInfoRequest>({
    method: 'POST',
    endpoint: 'authApi',
    path: '/viewer/info',
  }),
  updatePassword: client.createAction<
    OperationResponse<UpdatePasswordResponse>,
    UpdatePasswordRequest
  >({
    method: 'POST',
    endpoint: 'authApi',
    path: '/viewer/password',
  }),
};
