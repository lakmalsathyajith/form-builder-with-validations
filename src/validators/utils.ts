import {
  ErrorMessage,
  NumberRule,
  Rule,
  StringRule,
} from '../types/validationTypes';

/**
 * Trigger this if field is required.
 *
 * @param   {string}  value  Current value of the field.
 * @param   {Rule}    rules  All the rules applied to the field
 *
 * @return  {ErrorMessage}   If error occurred in related attribute this returns error
 */
export const isRequired = (value: string, rules: Rule): ErrorMessage => {
  let message;
  if (rules['required'] && !value.length) {
    message = 'This field is required.';
  }
  return message;
};

/**
 * Trigger this if fields input is more than the required max length.
 *
 * @param   {string}  value  Current value of the field.
 * @param   {StringRule}    rules  All the rules applied to the field
 *
 * @return  {ErrorMessage}   If error occurred in related attribute this returns error
 */
export const isMaxLength = (value: string, rules: StringRule): ErrorMessage => {
  let message;
  if (rules['maxLength'] && value.length > parseInt(rules['maxLength'])) {
    message = `The value should not be more than ${rules['maxLength']} characters.`;
  }
  return message;
};

/**
 * Trigger this if fields input is less than the required min length.
 *
 * @param   {string}  value  Current value of the field.
 * @param   {StringRule}    rules  All the rules applied to the field
 *
 * @return  {ErrorMessage}   If error occurred in related attribute this returns error
 */
export const isMinLength = (value: string, rules: StringRule): ErrorMessage => {
  let message;
  if (rules['minLength'] && value.length < parseInt(rules['minLength'])) {
    message = `The value should be more than ${rules['minLength']} characters.`;
  }
  return message;
};

/**
 * Trigger this if fields input value is greater than the required max value.
 *
 * @param   {string}  value  Current value of the field.
 * @param   {NumberRule}    rules  All the rules applied to the field
 *
 * @return  {ErrorMessage}   If error occurred in related attribute this returns error
 */
export const isMaxValue = (value: string, rules: NumberRule): ErrorMessage => {
  let message;
  if (rules['maxValue'] && parseInt(value) > parseInt(rules['maxValue'])) {
    message = `The value should be less than ${rules['maxValue']}.`;
  }
  return message;
};

/**
 * Trigger this if fields input value is less than the required min value.
 *
 * @param   {string}  value  Current value of the field.
 * @param   {NumberRule}    rules  All the rules applied to the field
 *
 * @return  {ErrorMessage}   If error occurred in related attribute this returns error
 */
export const isMinValue = (value: string, rules: NumberRule): ErrorMessage => {
  let message;
  if (rules['minValue'] && parseInt(value) < parseInt(rules['minValue'])) {
    message = `The value should be greater than ${rules['minValue']}.`;
  }
  return message;
};

/**
 * Check for multiple regex rules validation attached to the field.
 *
 * @param   {string}      value  Current value of the field.
 * @param   {NumberRule}  rules  This will be NumberRule when applied to Number type fields
 * @param   {StringRule}  rules  This will be StringRule when applied to String type fields
 *
 * @return  {ErrorMessage[]}    Returns array of error messages, if multiple regex rules are applied.
 */
export const isPatterns = (
  value: string,
  rules: NumberRule | StringRule
): ErrorMessage[] => {
  const messages: ErrorMessage[] = [];
  if (rules['patterns']) {
    rules['patterns'].forEach((pattern) => {
      const regex = new RegExp(pattern['regex'].trim());
      const isValid = regex.test(value.trim());
      if (!isValid) {
        messages.push(pattern['regexDescription']);
      }
    });
  }
  return messages;
};
