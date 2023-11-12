import { Request, Response } from 'express';

import { ApiError, UnknownError } from '#/errors';

import * as Auth from './auth';
import * as Viewer from './viewer';

export { Auth, Viewer };

export type OperationResponse<TData> =
  | {
      result: TData;
      error: null;
    }
  | {
      result: null;
      error: ApiError;
    };

export type CreateOperationArg<TResponse, TContext> = (
  request: Request,
  response: Response<OperationResponse<TResponse | null>>,
  context: TContext,
) => Promise<TResponse> | TResponse;

export function createOperationWithContext<TContext>(context: TContext) {
  return <TResponse>(fn: CreateOperationArg<TResponse, TContext>) => {
    return async (request: Request, response: Response<OperationResponse<TResponse | null>>) => {
      try {
        const result = await fn(request, response, context);

        return response.status(200).json({ result, error: null });
      } catch (err) {
        if (err instanceof ApiError) {
          const error = err as ApiError;

          return response.status(error.status).json({ result: null, error });
        } else {
          const error = err as Error;

          return response.status(500).json({
            result: null,
            error: new UnknownError({ messages: error.message, status: 500 }),
          });
        }
      }
    };
  };
}
