import { Endpoint } from '../../endpoints';
import { User } from '../../models';
import { Validators, client } from '../../utils';

export type UpdateInfoRequest = {
  login: string;
};

export type UpdateInfoResponse = {
  user: User;
};

export const validators = {
  login: Validators.login,
};

export const action = client.createAction<UpdateInfoResponse, UpdateInfoRequest>({
  method: 'POST',
  path: Endpoint.create('authApi', '/viewer/info'),
});
