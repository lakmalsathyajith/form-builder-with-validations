import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Rule } from '../types/validationTypes';
export enum FieldType {
  Number = 'number',
  String = 'string',
  Date = 'date',
  Boolean = 'boolean',
}

type Field = {
  key: string;
  type: FieldType;
  label: string;
  value: string;
  rules: Rule;
};

export interface FormState {
  fields: { [key: string]: Field };
}

const initialState: FormState = {
  fields: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (
      state: FormState,
      action: PayloadAction<{
        key: string;
        type: FieldType;
        label: string;
        rules: Rule;
      }>
    ) => {
      const { key, type, label, rules } = action.payload;
      state.fields[key] = {
        key,
        type,
        label,
        value: '',
        rules,
      };
    },
    setValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      console.log('-------------', action.payload);
      const { key, value } = action.payload;
      const field = state.fields[key];

      field.value = value;
    },
  },
});

export const { addField, setValue } = formSlice.actions;
export const formReducer = formSlice.reducer;
