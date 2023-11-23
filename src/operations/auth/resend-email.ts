import { OperationResponse } from '../../models';
import { client } from '../../utils';

export const action = client.createAction<OperationResponse>({
  method: 'POST',
  endpoint: 'authApi',
  path: '/auth/resend-email',
});
