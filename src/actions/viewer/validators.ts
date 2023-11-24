import { Validators } from '../../utils';

export const validators = {
  updateAvatar: {
    avatar: Validators.required('File is required'),
  },
  updateInfo: {
    login: Validators.login,
  },
  updatePassword: {
    oldPassword: Validators.required('Old password is required'),
    newPassword: Validators.newPassword,
  },
};
