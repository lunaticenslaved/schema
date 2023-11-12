import { z } from 'zod';

import { ValidationError } from '#/errors';

export type ValidationResult = null | string | undefined;
export type Validator<T> = (params?: T) => Promise<ValidationResult> | ValidationResult;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationObject = Record<string, Validator<any>>;

export const validateObj = (rules: ValidationObject) => async (values: Record<string, unknown>) => {
  const errors: string[] = [];

  for (const key in rules) {
    const error = await rules[key](values[key]);

    if (error) {
      errors.push(`${key}: ${error}`);
    }
  }

  const hasErrors = errors.length > 0;

  return {
    errors: hasErrors ? errors : null,
    hasErrors,
  };
};

export const validateRequest = async (
  validator: ValidationObject,
  data: Record<string, unknown>,
) => {
  const { errors } = await validateObj(validator)(data);

  if (errors) {
    throw new ValidationError({ messages: errors });
  }
};

export function zodWrapper<T>(fn: z.ZodType<T>) {
  return (value?: T) => {
    const result = fn.safeParse(value);

    if ('error' in result) {
      return result.error.message;
    }

    return null;
  };
}
