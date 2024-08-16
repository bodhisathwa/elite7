// app/theme.ts

import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8C00', // Dark Orange
    accent: '#006400', // Dark Green
    background: '#FFFFFF',
    text: '#000000',
    error: '#FF0000',
  },
};