import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '../redux';

const Providers = ({ children }: { children: ReactNode }): ReactElement => (
  <Provider store={store}>{children}</Provider>
);

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: Providers, ...options });

export { customRender as render };
