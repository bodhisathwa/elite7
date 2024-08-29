import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black', // black
    accent: '#FFA500', // Vibrant Orange
    secondary: '#00A86B', // Jade Green
    background: '#F8F9FA', // Off-White
    surface: '#FFFFFF', // Pure White
    text: '#212529', // Almost Black
    error: '#DC3545', // Crimson Red
    success: '#28A745', // Forest Green
    warning: '#FFC107', // Amber Yellow
    info: '#17A2B8', // Teal Blue
    disabled: '#6C757D', // Slate Gray
    placeholder: '#ADB5BD', // Cool Gray
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'SF Pro Display',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'SF Pro Display',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'SF Pro Display',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'SF Pro Display',
      fontWeight: '100',
    },
  },
  roundness: 12,
};

export type AppTheme = typeof theme;
