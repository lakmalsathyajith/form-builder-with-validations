import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';

import { DateField } from './../fields/DateField.tsx';
import DynamicRuleGenerator from './DynamicRuleGenerator.tsx';
import { rules } from './../rules/rules.json';
import { FieldType, FormElement } from '../../store/form.ts';
import { RegexRule, Rule, ValidatorArgs } from '../../types/validationTypes.ts';

type ValidationModalProps = {
  isOpen: boolean;
  setIsValidationModalOpen: (flag: boolean) => void;
  type: FieldType | string;
  setFieldRuleSet: React.Dispatch<React.SetStateAction<object>>;
};

type RuleSet = {
  [key: string]: unknown;
};

type RuleElement = {
  [key: string]: string;
};

// A dummy class to type assign the json
class TypeAssign {}

/**
 *  Encapsulates validation UI elements
 */
const ValidationModal = ({
  isOpen,
  setIsValidationModalOpen,
  type,
  setFieldRuleSet,
}: ValidationModalProps) => {
  const [open, setOpen] = useState(false);

  const [ruleSet, setRuleSet] = useState<RuleSet>({});

  const castedRules = Object.assign(new TypeAssign(), rules);

  const selectedRuleSet: RuleElement[] = castedRules[type as keyof TypeAssign];
  const onChangeRuleSetting = (
    rule: string,
    value: string | boolean | RegexRule[]
  ) => {
    console.log(rule, value);
    const ruleSetUpdated = ruleSet;

    ruleSetUpdated[rule] = value;
    setRuleSet(ruleSetUpdated);
    setFieldRuleSet(ruleSetUpdated);
  };

  const onApplyRuleSetting = () => {
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOpen, setOpen]);

  const handleClose = () => {
    setIsValidationModalOpen(false);
  };

  const modalStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24',
    maxHeight: '90%',
    overflowY: 'auto',
    p: 4,
  };

  const generateElement = (rule: RuleElement) => {
    let element;
    for (const propName in rule) {
      if (Object.prototype.hasOwnProperty.call(rule, propName)) {
        switch (rule[propName]) {
          case 'regex':
            element = (
              <Grid container spacing={2} key={propName}>
                <DynamicRuleGenerator
                  onRuleUpdate={onChangeRuleSetting}
                  frequentlyUsedRules={
                    castedRules['frequentlyUsed'][type as keyof TypeAssign]
                  }
                />
              </Grid>
            );
            break;
          case 'text':
            element = (
              <Grid item xs={6} key={propName}>
                <TextField
                  label={propName}
                  fullWidth
                  value={ruleSet[propName]}
                  onChange={(e) =>
                    onChangeRuleSetting(propName, e.target.value)
                  }
                />
              </Grid>
            );
            break;
          case 'boolean':
            element = (
              <Grid item xs={12} key={propName}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ruleSet[propName]}
                      onChange={() =>
                        onChangeRuleSetting(propName, !ruleSet[propName])
                      }
                      color="primary"
                    />
                  }
                  label={propName}
                />
              </Grid>
            );
            break;
          case 'date':
            element = (
              <Grid item xs={6} key={propName}>
                <DateField
                  label={propName}
                  onChange={(value) => onChangeRuleSetting(propName, value)}
                  value={ruleSet[propName]}
                />
              </Grid>
            );
        }
      }
    }
    return element;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-content" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {selectedRuleSet &&
                selectedRuleSet.map((rule: RuleElement) => {
                  return generateElement(rule);
                })}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={onApplyRuleSetting}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ValidationModal;
