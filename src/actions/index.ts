import { Action } from '../utils/client';

import * as auth from './auth';
import * as users from './users';
import * as viewer from './viewer';

export * from './auth/types';
export * from './viewer/types';
export * from './users/types';

export const actions = {
  auth: auth.actions,
  viewer: viewer.actions,
  users: users.actions,

  isAction(action: unknown): action is Action<unknown, unknown> {
    if (typeof action !== 'function') return false;
    if ('isAction' in action) return !!action.isAction;

    return false;
  },
};

export const validators = {
  auth: auth.validators,
  viewer: viewer.validators,
};
