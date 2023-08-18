import { isRequired, isMaxValue, isMinValue, isPatterns } from "./utils";
import { ErrorMessage, NumberRule } from "../types/validationTypes";

/**
 * Integrated all possible validations related to Number type fields.
 *
 * @param   {string}        validationValue  Current value of the field.
 * @param   {NumberRule}    rules            Current rule set attached to the field.
 *
 * @return  {ErrorMessage}                   Appropriate error message
 */
export const validate = (validationValue: string, rules:NumberRule): ErrorMessage => {

  let errorMessages = [];
  errorMessages.push(isRequired(validationValue, rules));
  errorMessages.push(isMaxValue(validationValue, rules));
  errorMessages.push(isMinValue(validationValue, rules));
  errorMessages = errorMessages.concat(isPatterns(validationValue, rules));

  return errorMessages.filter(err => !!err).pop();
}