import { Endpoint } from '../../endpoints';
import { User } from '../../models';
import { OperationResponse, client } from '../../utils';

export type RefreshResponse = {
  user: User;
  token: string;
};

export const action = client.createAction<OperationResponse<RefreshResponse>>({
  method: 'POST',
  path: Endpoint.create('authApi', '/auth/refresh'),
});
