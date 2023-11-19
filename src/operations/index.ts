import { Request, Response } from 'express';

import { ApiError, UnknownError } from '../errors';
import { OperationResponse } from '../utils';

import * as Auth from './auth';
import * as Viewer from './viewer';

export { Auth, Viewer };

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

        return response.status(200).json({ data: result || null, error: null });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        if (err instanceof ApiError) {
          const error = err as ApiError;

          return response.status(error.status).json({ data: null, error });
        } else {
          const error = err as Error;

          return response.status(500).json({
            data: null,
            error: new UnknownError({ messages: error.message, status: 500 }),
          });
        }
      }
    };
  };
}
