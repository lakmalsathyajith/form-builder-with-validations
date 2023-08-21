import { FormBuilder } from './components/FormBuilder.tsx';
import { FormView } from './components/FormView.tsx';
import { Grid } from '@mui/material';
import './App.css';

function App() {
  return (
    <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
      <Grid item xs={12} sm={6}>
        <FormBuilder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormView />
      </Grid>
    </Grid>
  );
}

export default App;
