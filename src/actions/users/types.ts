import { User } from '../../models';

export interface GetUserRequest {
  userId: string;
}
export interface GetUserResponse {
  user: User;
}

export type ListUsersRequest =
  | {
      userIds: string[];
      search?: string;
    }
  | {
      search: string;
      take: number;
    };
export interface ListUsersResponse {
  users: User[];
}
