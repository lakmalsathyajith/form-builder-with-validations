import { FieldType } from '../store/form';
import { ErrorMessage, Rule } from '../types/validationTypes';

export type ErrorObject = {
  error: boolean;
  helperText: ErrorMessage;
};
export interface Validatable {
  validate(validationValue: string, rules: Rule): ErrorObject;
  errorMessages: ErrorMessage[];
  errorObject: ErrorObject;
  propsObject: unknown;
}

export class ValidatorBase {
  errorMessages: ErrorMessage[] = [];
  errorObject: ErrorObject;
  propsObject: unknown;

  constructor() {
    this.errorObject = {
      error: false,
      helperText: '',
    };
  }

  getErrorObject(): ErrorObject {
    return {
      error: !!this.errorMessages
        .filter((err) => !!err)
        .reverse()
        .pop(),
      helperText: this.errorMessages
        .filter((err) => !!err)
        .reverse()
        .pop(),
    };
  }
}

/**
 * Acting as a factory method to choose relevant validator based on the type.
 *
 * @param   {FieldType}  type   One of the validator types
 * @param   {string}  value  Current field value
 * @param   {Rule}  rules  Rule set attached to the field.
 *
 * @return  {Promise<ErrorMessage>}    A promise of generated error messages
 */
export const getValidated = async (
  type: FieldType,
  value: string,
  rules: Rule
): Promise<ErrorMessage> => {
  console.log('=========[0]======', new Date().toISOString().split('T')[0]);
  return await import(`./${type}`)
    .then((validator) => {
      const validatorObj = new validator.default();
      return validatorObj.validate(value, rules);
    })
    .catch((err) => {
      console.log('No validations found.', { err });
    });
};
