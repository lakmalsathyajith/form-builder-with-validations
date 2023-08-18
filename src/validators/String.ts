import { isRequired, isMaxLength, isMinLength, isPatterns } from "./utils";
import { ErrorMessage, StringRule } from "../types/validationTypes";

type ErrorObject = {
  error: boolean,
  helperText: ErrorMessage
}

/**
 * Integrated all possible validations related to String type fields.
 *
 * @param   {string}        validationValue  Current value of the field.
 * @param   {StringRule}    rules            Current rule set attached to the field.
 *
 * @return  {ErrorMessage}                   Appropriate error message
 */
export const validate = (validationValue: string, rules: StringRule): ErrorObject => {

  let errorMessages = [];
  errorMessages.push(isRequired(validationValue, rules));
  errorMessages.push(isMaxLength(validationValue, rules));
  errorMessages.push(isMinLength(validationValue, rules));
  errorMessages = errorMessages.concat(isPatterns(validationValue, rules));

  const errorObject: ErrorObject = {
    error: !!errorMessages.filter(err => !!err).pop(),
    helperText: errorMessages.filter(err => !!err).pop()
  }

  const propsObject = {}

  return {...errorObject, ...propsObject};
}