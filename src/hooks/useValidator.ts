import { useState, useMemo } from "react";
import { getValidated } from '../validators';
import { FieldType } from '../store/form';
import { ErrorMessage, Rule } from '../types/validationTypes';


type useValidatorReturnType = {
  validate: (type: FieldType, key: string, value: string, rules: Rule) => Promise<void>,
  errors: unknown
}

/**
 * [useValidator description]
 *
 * @return  {useValidatorReturnType}  Return validator functions set of errors and props.
 */
export const useValidator = (): useValidatorReturnType => {
  const [validatorProps, setValidatorProps] = useState({});

  const validate =  async (type: FieldType, key: string, value: string, rules: Rule) => {
    const validatedData = await getValidated(type, value, rules);
    const updatedProps = { ...validatorProps };
    updatedProps[key] = validatedData;
    setValidatorProps(updatedProps);
  }

  console.log('-------inside the hook-------', validatorProps)

  return {
    validate,
    validatorProps
  }
}