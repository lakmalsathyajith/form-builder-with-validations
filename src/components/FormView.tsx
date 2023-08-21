import { RootState } from '../store/config.ts';
import { useDispatch, useSelector } from 'react-redux';
import { FieldType, setValue } from '../store/form.ts';
import { InputField } from './fields/InputField.tsx';
import { CheckboxField } from './fields/CheckboxField.tsx';
import { DateField } from './fields/DateField.tsx';
import { Grid, Typography } from '@mui/material';
import { useValidator } from '../hooks/useValidator.ts';

export const FormView = () => {
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const { validate, validatorProps } = useValidator(fields);

  const renderFields = () => {
    const renderedFields = [];
    for (const key in fields) {
      const { value, label, type, rules } = fields[key];

      // Trigger validation on change
      const onChange = (value: string) => {
        dispatch(setValue({ key, value }));
        validate(type, key, value, rules);
      };
      let commonProps = {
        label,
        onChange,
        value,
      };
      commonProps = Object.assign(commonProps, validatorProps[key]);
      switch (type) {
        case FieldType.Number:
        case FieldType.String:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <InputField {...commonProps} />
            </Grid>
          );
          break;
        case FieldType.Boolean:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <CheckboxField {...commonProps} />
            </Grid>
          );
          break;
        case FieldType.Date:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <DateField {...commonProps} />
            </Grid>
          );
      }
    }

    return renderedFields;
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Preview
        </Typography>
      </Grid>
      {renderFields()}
    </Grid>
  );
};
