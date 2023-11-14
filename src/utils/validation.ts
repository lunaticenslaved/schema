import { z } from 'zod';

import { ValidationError } from '#/errors';

export type ValidationResult = null | string | string[] | undefined;
export type Validator<T> = (params?: T) => Promise<ValidationResult> | ValidationResult;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationObject = Record<string, Validator<any>>;

export const validateRequest = async (rules: ValidationObject, values: Record<string, unknown>) => {
  const errors: string[] = [];

  for (const key in rules) {
    const error = await rules[key](values[key]);

    if (typeof error === 'string') {
      errors.push(error);
    } else if (Array.isArray(error)) {
      errors.push(...error);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError({ messages: errors });
  }
};

export function zodWrapper<T>(fn: z.ZodType<T>) {
  return (value?: T) => {
    const result = fn.safeParse(value);

    if ('error' in result) {
      return result.error.errors.map(({ message }) => message);
    }

    return null;
  };
}
