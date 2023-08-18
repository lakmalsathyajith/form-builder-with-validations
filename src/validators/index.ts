import { FieldType } from "../store/form";
import { ErrorMessage, Rule } from "../types/validationTypes";

/**
 * Acting as a factory method to choose relevant validator based on the type.
 *
 * @param   {FieldType}  type   One of the validator types
 * @param   {string}  value  Current field value
 * @param   {Rule}  rules  Rule set attached to the field.
 *
 * @return  {Promise<ErrorMessage>}    A promise of generated error messages
 */
export const getValidated = async (type: FieldType, value: string, rules: Rule): Promise<ErrorMessage> => {
  return await import(`./${type}`).then((validator) => {
    return validator.validate(value, rules);
  }).catch((err) => {
    console.log({err})
  });
};