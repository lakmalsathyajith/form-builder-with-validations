import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import { DateField } from "./../fields/DateField.tsx";
import DynamicRuleGenerator from './DynamicRuleGenerator.tsx';
import { rules } from './../rules/rules.json'

const ValidationModal: React.FC = ({ isOpen, setIsValidationModalOpen, type, setFieldRuleSet }) => {
  const [open, setOpen] = useState(false);

  const [ruleSet, setRuleSet] = useState({});
  const selectedRuleSet = rules[type];

  const onChangeRuleSetting = (rule, value) => {
    console.log(rule, value)
    const ruleSetUpdated = ruleSet;
    ruleSetUpdated[rule] = value
    setRuleSet(ruleSetUpdated);
    setFieldRuleSet(ruleSetUpdated);
  }

  const onApplyRuleSetting = () => {
    handleClose()
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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight: '90%',
    overflowY: 'auto',
    p: 4,
  };

  const generateElement = (rule) => {
    let element;
    for (const propName in rule) {
      if (rule.hasOwnProperty(propName)) {
        switch (rule[propName]) {
          case "regex":
            element =
              <Grid container spacing={2}>
                <DynamicRuleGenerator onRuleUpdate={onChangeRuleSetting} frequentlyUsedRules={rules['frequentlyUsed'][type]}/>
              </Grid>
            break;
          case "text":
            element = <Grid item xs={6}>
              <TextField
                label={propName}
                fullWidth
                value={ruleSet[propName]}
                onChange={(e) => onChangeRuleSetting(propName, e.target.value)}
              />
            </Grid>
            break;
          case "boolean":
            element = <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ruleSet[propName]}
                    onChange={(e) => onChangeRuleSetting(propName, !ruleSet[propName])}
                    color="primary"
                  />
                }
                label={propName}
              />
            </Grid>
            break
          case "date":
            element = <Grid item xs={6}>
              <DateField label={propName} />
            </Grid>
        }
      }
    }
    return element;
  }


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
              {selectedRuleSet && selectedRuleSet.map((rule) => {
                return generateElement(rule);
              })}
              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="contained" color="primary" onClick={onApplyRuleSetting}>
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
