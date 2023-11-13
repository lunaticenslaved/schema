import { Endpoint } from '#/endpoints';
import { User } from '#/models';
import { Validators } from '#/utils';
import { Client } from '#/utils/client';

export namespace UpdateAvatar {
  export type Request = {
    avatar: object;
  };

  export type Response = {
    user: User;
  };

  export const validators = {
    avatar: Validators.required('File is required'),
  };

  export function operation(data: Request) {
    return Client.post(Endpoint.create('authApi', '/viewer/avatar'), data);
  }
}
