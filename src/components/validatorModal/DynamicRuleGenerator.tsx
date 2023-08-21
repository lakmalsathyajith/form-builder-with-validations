import { useState, useEffect, Fragment, useCallback } from 'react';
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Chip,
  Paper,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RegexRule } from '../../types/validationTypes';

type DynamicRuleGeneratorProps = {
  onRuleUpdate: (rule: string, value: string | boolean | RegexRule[]) => void;
  frequentlyUsedRules: RegexRule[];
};

/**
 * Dynamically generates regex rules based on the user inputs.
 */
const DynamicRuleGenerator = ({
  onRuleUpdate,
  frequentlyUsedRules,
}: DynamicRuleGeneratorProps) => {
  const [frequentRules, setFrequentRules] = useState(frequentlyUsedRules);
  const [dataList, setDataList] = useState<RegexRule[]>([]);
  const [regex, setRegex] = useState('');
  const [regexDescription, setRegexDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const filterFrequentRules = useCallback(() => {
    let updatedFrequentRules: RegexRule[] = []; //
    if (frequentlyUsedRules) {
      updatedFrequentRules = frequentlyUsedRules.filter((rule) => {
        let ruleNotFound = true;
        dataList &&
          dataList.some((addedRule: RegexRule) => {
            ruleNotFound =
              addedRule.regex !== rule.regex &&
              addedRule.regexDescription !== rule.regexDescription;
            return !ruleNotFound;
          });
        return ruleNotFound;
      });
    }
    return updatedFrequentRules;
  }, [dataList, frequentlyUsedRules]);

  useEffect(() => {
    onRuleUpdate('patterns', dataList);
    setFrequentRules([...filterFrequentRules()]);
  }, [dataList, onRuleUpdate, filterFrequentRules]);

  const addFrequentItemsToData = (item: RegexRule) => {
    const dataListUpdated: RegexRule[] = [...dataList];
    dataListUpdated.push(item);
    setDataList(dataListUpdated);
  };

  const handleAdd = () => {
    if (regex && regexDescription) {
      if (editIndex !== -1) {
        const updatedList = [...dataList];
        updatedList[editIndex] = { regex, regexDescription };
        setDataList(updatedList);
        setEditIndex(-1);
      } else {
        setDataList([...dataList, { regex, regexDescription }]);
      }
      setRegex('');
      setRegexDescription('');
    }
  };

  const handleEdit = (index: number) => {
    const { regex, regexDescription } = dataList[index];
    setRegex(regex);
    setRegexDescription(regexDescription);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedList = dataList.filter((_, i) => i !== index);
    setDataList(updatedList);
  };

  return (
    <Fragment>
      <Box
        border={1}
        borderColor="primary.main"
        p={2}
        sx={{
          margin: '0 auto',
          p: 3,
          ml: '32px',
          width: '100%',
        }}
      >
        <Grid container spacing={1}>
          {frequentRules.length ? (
            <Fragment>
              <Typography>Frequently used</Typography>
              {frequentRules.map((data, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '5px',
                    }}
                  >
                    {data.regexDescription}
                    <IconButton
                      color="primary"
                      aria-label="add"
                      onClick={() => addFrequentItemsToData(data)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              ))}
            </Fragment>
          ) : null}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography>Create New</Typography>
            <TextField
              sx={{ mt: 1 }}
              label="Regex"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ mt: 1 }}
              label="Regex Description"
              value={regexDescription}
              onChange={(e) => setRegexDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={handleAdd}
            >
              {editIndex === -1 ? 'Create' : 'Update'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        border={1}
        borderColor="primary.main"
        p={2}
        sx={{
          margin: '0 auto',
          p: 3,
          ml: '32px',
          width: '100%',
          mt: '10px',
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          {dataList.length
            ? dataList.map((data, index) => (
                <Grid item xs={12} key={index}>
                  <Chip
                    label={data.regexDescription}
                    onDelete={() => handleDelete(index)}
                    onClick={() => handleEdit(index)}
                    variant="outlined"
                    sx={{ width: '100%', justifyContent: 'space-between' }}
                  />
                </Grid>
              ))
            : 'No rules added.'}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DynamicRuleGenerator;
