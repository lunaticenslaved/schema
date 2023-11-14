import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Client, Validators } from '#/utils';

export type UpdateInfoRequest = {
  login: string;
};

export type UpdateInfoResponse = {
  user: User;
};

export const validators = {
  login: Validators.login,
};

export const action = Client.createOperation<UpdateInfoResponse, UpdateInfoRequest>({
  method: 'post',
  path: Endpoint.create('authApi', '/viewer/info'),
});
