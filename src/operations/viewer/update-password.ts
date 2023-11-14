import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client, Validators } from '#/utils';

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

export const operation = Client.createOperation<UpdatePasswordResponse, UpdatePasswordRequest>({
  method: 'post',
  path: Endpoint.create('authApi', '/viewer/password'),
});
