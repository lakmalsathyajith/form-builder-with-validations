import { isRequired, isMaxValue, isMinValue, isPatterns } from "./utils";
import { ErrorMessage, NumberRule, Rule } from "../types/validationTypes";

/**
 * Integrated all possible validations related to Number type fields.
 *
 * @param   {string}        validationValue  Current value of the field.
 * @param   {Rule}    rules            Current rule set attached to the field.
 *
 * @return  {ErrorMessage}                   Appropriate error message
 */
export const validate = (validationValue: string, rules:Rule): ErrorMessage => {

  const errorMessages = [];
  const props = [];
  errorMessages.push(isRequired(validationValue, rules));

  return errorMessages.filter(err => !!err).pop();
}