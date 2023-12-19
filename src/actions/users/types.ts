import { Service, User } from '../../models';

export interface GetUserRequest {
  userId: string;
}
export interface GetUserResponse {
  user: User;
}

export interface ListUsersRequest {
  take?: number;
  userIds?: string[];
  search?: string;
  services?: Array<Service>;
  excludeIds?: string[];
}

export interface ListUsersResponse {
  users: User[];
}
