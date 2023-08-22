import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from '../store/testUtils';

test('renders type dropdown, with value string', async () => {
  const { container } = renderWithProviders(<App />);
  renderWithProviders(<App />);
  const selectElement = container.getElementsByClassName('MuiSelect-outlined');
  await userEvent.click(selectElement[0]);

  const elements = screen.getAllByRole('option');
  const secondListItem = elements[1];

  userEvent.click(secondListItem);
  expect(secondListItem).toHaveTextContent('String');
});

test('renders validator modal component with 5 static rules.', async () => {
  const { container } = renderWithProviders(<App />);
  //renderWithProviders(<App />);
  const selectElement = container.getElementsByClassName('MuiSelect-outlined');
  await userEvent.click(selectElement[0]);

  const elements = screen.getAllByRole('option');
  const secondListItem = elements[1];

  await userEvent.click(secondListItem);

  const input1 = screen.getAllByLabelText('Key');
  await userEvent.type(input1[0], 'testfield');
  expect(input1[0]).toHaveValue('testfield');

  const input2 = screen.getAllByLabelText('Label');
  await userEvent.type(input2[0], 'testfieldlabel');
  expect(input2[0]).toHaveValue('testfieldlabel');

  const validationButton = await screen.findAllByTestId('add-validations');
  await userEvent.click(validationButton[0]);

  const buttonInValidatorModal = await screen.findAllByTestId('add-rule');
  expect(buttonInValidatorModal.length).toBe(4);
});
