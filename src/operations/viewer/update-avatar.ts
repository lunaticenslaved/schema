import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client, Validators } from '#/utils';

export type UpdateAvatarRequest = {
  avatar: object;
};

export type UpdateAvatarResponse = {
  user: User;
};

export const validators = {
  avatar: Validators.required('File is required'),
};

export const action = Client.createOperation<UpdateAvatarResponse, UpdateAvatarRequest>({
  method: 'post',
  path: Endpoint.create('authApi', '/viewer/avatar'),
});
