import { useState, useEffect, useCallback } from 'react';
import { getValidated } from '../validators';
import { FieldType, FormElement } from '../store/form';
import { ErrorMessage, Rule, ErrorElement } from '../types/validationTypes';
import { Field, FormKey } from '../store/form';

type useValidatorReturnType = {
  validate: (
    type: FieldType,
    key: string,
    value: string,
    rules: Rule
  ) => Promise<void>;
  validatorProps: { [key: string]: ErrorMessage };
};

/**
 * Custom Hook to validate the form, when included in form view component,
 * validation errors are available in top level,
 * that can decide the form submission
 *
 * @return  {useValidatorReturnType}  Return validator functions set of errors and props.
 */
export const useValidator = (fields: FormElement): useValidatorReturnType => {
  const [validatorProps, setValidatorProps] = useState({});

  const validate = async (
    type: FieldType,
    key: string,
    value: string,
    rules: Rule
  ) => {
    const validatedData = await getValidated(type, value, rules);
    const updatedProps: ErrorElement = { ...validatorProps };
    updatedProps[key as keyof ErrorMessage] = validatedData;
    setValidatorProps(updatedProps);
  };

  const validateAll = useCallback(
    async (fields: FormElement) => {
      const validatorKeys = Object.keys(fields);
      const updatedProps: ErrorElement = {
        ...validatorProps,
      };
      if (validatorKeys.length) {
        for (let i = 0; i < validatorKeys.length; i++) {
          console.log(validatorKeys[i]);
          const { value, type, rules }: Field =
            fields[validatorKeys[i] as keyof FormKey];
          const validatedData = await getValidated(type, value, rules);
          updatedProps[validatorKeys[i]] = validatedData;
        }
      }
      setValidatorProps(updatedProps);
    },
    [validatorProps]
  );

  useEffect(() => {
    if (Object.keys(fields).length) validateAll(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  return {
    validate,
    validatorProps,
  };
};
