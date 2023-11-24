import { OperationResponse } from '../../models';
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
  get: client.createAction<OperationResponse<GetViewerResponse>>({
    method: 'GET',
    endpoint: 'authApi',
    path: '/viewer',
  }),
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
