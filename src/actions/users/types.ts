import { User } from '../../models';

export interface GetUserRequest {
  userId: string;
}
export interface GetUserResponse {
  user: User;
}

export interface ListUserRequest {
  userIds: string[];
}
export interface ListUserResponse {
  users: User[];
}
