import { Endpoint } from '../../endpoints';
import { User } from '../../models';
import { Validators, client } from '../../utils';

export type UpdateAvatarRequest = {
  avatar: object;
};

export type UpdateAvatarResponse = {
  user: User;
};

export const validators = {
  avatar: Validators.required('File is required'),
};

export const action = client.createAction<UpdateAvatarResponse, UpdateAvatarRequest>({
  method: 'POST',
  path: Endpoint.create('authApi', '/viewer/avatar'),
});
