import React from 'react';
import { ThemeProvider } from '@emotion/react';
// import theme from '../src/models/theme';

const theme = {
  colors: {
    yellow: {
      400: '#f1c40f',
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <div style={{ color: 'red' }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];
