import { OperationResponse, User } from '../../models';
import { client } from '../../utils';

export interface ActivateResponse {
  user: User;
}

export const action = client.createAction<OperationResponse<ActivateResponse>>({
  method: 'POST',
  endpoint: 'authApi',
  path: '/auth/activate',
});
