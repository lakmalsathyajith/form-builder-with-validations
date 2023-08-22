import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from './config';
import { render } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithProvider = (children: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export function renderWithProviders(ui: ReactElement) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
