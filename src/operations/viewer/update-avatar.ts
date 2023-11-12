import { UploadedFile } from 'express-fileupload';

import { Validators } from '#';
import { User } from '#/models';
import { Client } from '#/utils/client';
import { Endpoint } from '#/endpoints';

export namespace UpdateAvatar {
  export type Request = {
    avatar: UploadedFile;
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
