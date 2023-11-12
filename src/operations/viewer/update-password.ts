import { Validators } from '#';

import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client } from '#/utils/client';

export type Request = {
  oldPassword: string;
  newPassword: string;
};

export type Response = {
  user: User;
};

export const validators = {
  oldPassword: Validators.required('Old password is required'),
  newPassword: Validators.newPassword,
};

export function operation(data: Request) {
  return Client.post(Endpoint.create('authApi', '/viewer/password'), data);
}
