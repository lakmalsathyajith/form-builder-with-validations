import { isRequired, isMaxValue, isMinValue, isPatterns } from './utils';
import { NumberRule } from '../types/validationTypes';

import { ErrorObject, Validatable, ValidatorBase } from '.';

class NumberValidator extends ValidatorBase implements Validatable {
  /**
   * Integrated all possible validations related to Number type fields.
   *
   * @param   {string}        validationValue  Current value of the field.
   * @param   {NumberRule}    rules            Current rule set attached to the field.
   *
   * @return  {ErrorMessage}                   Appropriate error message
   */
  validate = (validationValue: string, rules: NumberRule): ErrorObject => {
    this.errorMessages.push(isRequired(validationValue, rules));
    this.errorMessages.push(isMaxValue(validationValue, rules));
    this.errorMessages.push(isMinValue(validationValue, rules));
    this.errorMessages = this.errorMessages.concat(
      isPatterns(validationValue, rules)
    );

    const propsObject = {};

    return { ...this.getErrorObject(), ...propsObject };
  };
}

export default NumberValidator;
