/* eslint-disable react-refresh/only-export-components */
import  { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

const render = (ui: ReactElement, options?: RenderOptions) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const renderResult = rtlRender(ui, {
    container,
    ...options,
  });

  return {
    ...renderResult,
    unmount: () => {
      root.unmount();
      document.body.removeChild(container);
    },
  };
};

export * from '@testing-library/react';
export { render };
