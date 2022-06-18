import { useState, useCallback } from 'react';
import * as R from 'ramda';
import { ObjectSchema, ValidationError } from 'yup';
import { ChangeEvent, FormEvent } from 'react';

type Procedure = (...args: any[]) => void;

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  isImmediate: boolean = false
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<F>) {
    const doLater = function () {
      timeoutId = undefined;
      if (!isImmediate) func(...args);
    };

    const shouldCallNow = isImmediate && timeoutId === undefined;

    if (timeoutId) {
      clearTimeout(timeoutId);
    } 
    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) func(...args);
  };
}

type Fields = Record<string, any>;

type OnSubmitFunc = (fields: Fields | any) => void | Promise<void>;

type Opts = {
  abortEarly: boolean;
};

export const textToCapitalizeWord = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const useFormHook = <T, K extends { [key: string]: any }>(
  initialValues: T,
  schema: ObjectSchema<K>,
  debounceMillis?: number,
) => {
  const [values, setValues] = useState<T>(initialValues);

  const [errors, setErrors] = useState<T | Fields>(initialValues);

  const [disabled, setDisabled] = useState(true);

  const [isDirty, setIsDirty] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);

  const handleValidateAll = useCallback<
    (values: Fields, options?: Opts) => void
  >(
    async (values: Fields, options: Opts = { abortEarly: false }) => {
      try {
        await schema.validate(values, options);

        setDisabled(false);
      } catch (error) {
        setDisabled(true);
      }
    },
    [setDisabled, schema]
  );

  const handleValidateOne = useCallback<
    (path: string, value: Fields) => Promise<void>
  >(
    async (path: string, value: Fields) => {
      try {
        await schema.validateAt(path, value);

        await handleValidateAll(value);
      } catch (error: any) {
        if (error instanceof ValidationError) {
          setDisabled(true);

          setErrors((prevValues) => ({
            ...prevValues,
            [error.path]: R.pipe(
              R.head,
              R.split(/(?=[A-Z])/),
              R.join(' '),
              R.toLower,
              textToCapitalizeWord,
              R.replace('_', ' ')
            )(error.errors),
          }));
        }
      }
    },
    [schema, handleValidateAll]
  );

  const _handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);

    setErrors((prevValues) => ({
      ...prevValues,
      [target.name]: R.empty(''),
    }));

    setValues((prevValues) => {
      const newValues = { ...prevValues, [target.name]: target.value };

      handleValidateOne(target.name, newValues);

      return newValues;
    });
  };

  const handleChange = debounce(_handleChange, debounceMillis);

  const handleSubmit = (onSubmit: OnSubmitFunc) => async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    await onSubmit(values);

    setSubmitting(false);
  };

  return {
    values,
    errors,
    disabled,
    isDirty,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useFormHook;
