import { ApiError } from '../errors';

export type OperationResponse<TData = null> =
  | {
      data: TData;
      error: null;
    }
  | {
      data: null;
      error: ApiError;
    };
