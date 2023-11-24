import { Validators } from '../../utils';

export const validators = {
  signIn: {
    login: Validators.login,
    password: Validators.newPassword,
  },
  signUp: {
    login: Validators.login,
    email: Validators.email,
    password: Validators.newPassword,
  },
};
