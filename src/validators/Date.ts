import { ErrorObject, Validatable, ValidatorBase } from '.';
import { Rule } from '../types/validationTypes';

class StringValidator extends ValidatorBase implements Validatable {
  /**
   * Integrated all possible validations related to String type fields.
   *
   * @param   {string}        _validationValue  Current value of the field.
   * @param   {StringRule}    rules            Current rule set attached to the field.
   *
   * @return  {ErrorMessage}                   Appropriate error message
   */
  validate = (_validationValue: string, rules: Rule): ErrorObject => {
    const propsObject = {
      inputProps: {
        max: rules['maxDate'],
        min: rules['minDate'],
      },
      required: !!rules['required'],
    };

    return { ...this.getErrorObject(), ...propsObject };
  };
}

export default StringValidator;
