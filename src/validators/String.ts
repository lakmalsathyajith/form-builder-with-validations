import { ErrorObject, Validatable, ValidatorBase } from '.';
import { StringRule } from '../types/validationTypes';
import { isRequired, isMaxLength, isMinLength, isPatterns } from './utils';

class StringValidator extends ValidatorBase implements Validatable {
  /**
   * Integrated all possible validations related to String type fields.
   *
   * @param   {string}        validationValue  Current value of the field.
   * @param   {StringRule}    rules            Current rule set attached to the field.
   *
   * @return  {ErrorMessage}                   Appropriate error message
   */
  validate = (validationValue: string, rules: StringRule): ErrorObject => {
    this.errorMessages.push(isRequired(validationValue, rules));
    this.errorMessages.push(isMaxLength(validationValue, rules));
    this.errorMessages.push(isMinLength(validationValue, rules));
    this.errorMessages = this.errorMessages.concat(
      isPatterns(validationValue, rules)
    );

    const propsObject = {};

    return { ...this.getErrorObject(), ...propsObject };
  };
}

export default StringValidator;
