import { useState, useCallback, useEffect } from "react";
import { getValidated } from '../validators';
import { FieldType } from '../store/form';
import { Rule } from '../types/validationTypes';


type useValidatorReturnType = {
  validate: (type: FieldType, key: string, value: string, rules: Rule) => Promise<void>,
  errors: unknown
}

/**
 * [useValidator description]
 *
 * @return  {useValidatorReturnType}  Return validator functions set of errors and props.
 */
export const useValidator = (fields): useValidatorReturnType => {
  const [validatorProps, setValidatorProps] = useState({});

  const validate = async (type: FieldType, key: string, value: string, rules: Rule) => {
    const validatedData = await getValidated(type, value, rules);
    const updatedProps = { ...validatorProps };
    updatedProps[key] = validatedData;
    setValidatorProps(updatedProps);
  }

  useEffect(() => {
    if(Object.keys(fields).length)
       validateAll(fields)
}, [fields])

  const validateAll = async (fields) => {
    const validatorKeys = Object.keys(fields);
    const updatedProps = { ...validatorProps };
    if (validatorKeys.length) {
        for (let i = 0; i < validatorKeys.length; i++) {
          const { value, type, rules } = fields[validatorKeys[i]];
          const validatedData = await getValidated(type, value, rules);
          updatedProps[validatorKeys[i]] = validatedData;

        }
    }
    setValidatorProps(updatedProps);
  }

  return {
    validate,
    validatorProps,
  }
}