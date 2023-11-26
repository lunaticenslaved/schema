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
};

export const validators = {
  auth: auth.validators,
  viewer: viewer.validators,
};
