import { Endpoint } from '../../endpoints';
import { User } from '../../models';
import { Validators, client } from '../../utils';

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  user: User;
};

export const validators = {
  oldPassword: Validators.required('Old password is required'),
  newPassword: Validators.newPassword,
};

export const action = client.createAction<UpdatePasswordResponse, UpdatePasswordRequest>({
  method: 'POST',
  path: Endpoint.create('authApi', '/viewer/password'),
});
