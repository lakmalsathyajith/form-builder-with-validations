export type ErrorMessage = string | undefined;

export type RegexRule = {
  regex: string;
  regexDescription: string;
};

export declare interface Rule {
  required: boolean;
}

export interface StringRule extends Rule {
  patterns: RegexRule[];
  maxLength: string;
  minLength: string;
}

export interface NumberRule extends Rule {
  patterns: RegexRule[];
  maxValue: string;
  minValue: string;
}

export type ValidatorArgs = {
  validationValue: string;
  rules: Rule;
};
