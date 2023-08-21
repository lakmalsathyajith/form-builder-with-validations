import { Dropdown } from './fields/Dropdown.tsx';
import { Fragment, useState } from 'react';
import { addField, FieldType } from '../store/form.ts';
import { Button, Grid, Typography } from '@mui/material';
import { InputField } from './fields/InputField.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/config.ts';
import ValidationModal from './validatorModal';
import { Rule } from '../types/validationTypes.ts';

export const FormBuilder = () => {
  const [currentType, setCurrentType] = useState<FieldType | string>();
  const [currentKey, setCurrentKey] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [fieldRuleSet, setFieldRuleSet] = useState({});
  const dispatch = useDispatch();
  const { fields } = useSelector((state: RootState) => state.form);

  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert('Key already exists');
      return;
    }

    if (currentType && currentKey && currentLabel) {
      dispatch(
        addField({
          key: currentKey,
          type: currentType as FieldType,
          label: currentLabel,
          rules: fieldRuleSet as Rule,
        })
      );
      setCurrentType('');
      setCurrentKey('');
      setCurrentLabel('');
      setFieldRuleSet({});
    }
  };

  const openValidationModal = () => {
    setIsValidationModalOpen(true);
  };

  const disabled =
    (fields[currentKey] !== undefined && currentType) || currentKey === '';

  return (
    <Fragment>
      <Grid container spacing={2} sx={{ width: 300, margin: 'auto' }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Form Builder
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Dropdown
            label="Choose a field type"
            value={currentType}
            onChange={(type) => setCurrentType(type)}
            options={{
              Number: FieldType.Number,
              String: FieldType.String,
              Date: FieldType.Date,
              Boolean: FieldType.Boolean,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            onChange={(value) => setCurrentKey(value)}
            label="Key"
            value={currentKey}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            onChange={(value) => setCurrentLabel(value)}
            label="Label"
            value={currentLabel}
          />
        </Grid>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={6} sx={{ ml: '16px' }}>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={openValidationModal}
              disabled={!!disabled}
            >
              Add Validations
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddingField}
            >
              Add Field
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ValidationModal
        key={currentKey}
        isOpen={isValidationModalOpen}
        setIsValidationModalOpen={setIsValidationModalOpen}
        type={currentType}
        setFieldRuleSet={setFieldRuleSet}
      />
    </Fragment>
  );
};
