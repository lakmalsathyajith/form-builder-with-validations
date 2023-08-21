import { isRequired } from './utils';
import { NumberRule } from '../types/validationTypes';

import { ErrorObject, Validatable, ValidatorBase } from '.';

class BooleanValidator extends ValidatorBase implements Validatable {
  /**
   * Integrated all possible validations related to Boolean type fields.
   *
   * @param   {string}        validationValue  Current value of the field.
   * @param   {Rule}    rules            Current rule set attached to the field.
   *
   * @return  {ErrorMessage}                   Appropriate error message
   */
  validate = (validationValue: string, rules: NumberRule): ErrorObject => {
    this.errorMessages.push(isRequired(validationValue, rules));

    const propsObject = {
      required: !!rules['required'],
    };

    return { ...this.getErrorObject(), ...propsObject };
  };
}

export default BooleanValidator;
