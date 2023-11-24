import * as auth from './auth';
import * as viewer from './viewer';

export * from './auth/types';
export * from './viewer/types';

export const actions = {
  auth: auth.actions,
  viewer: viewer.actions,
};

export const validators = {
  auth: auth.validators,
  viewer: viewer.validators,
};
