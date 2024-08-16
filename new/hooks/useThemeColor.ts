import { useColorScheme } from 'react-native';

export const useThemeColor = () => {
  const colorScheme = useColorScheme();

  const themeColors = {
    light: {
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      primaryColor: '#FFA500', // Orange
      secondaryColor: '#FFD700', // Yellow
    },
    dark: {
      backgroundColor: '#1E1E1E',
      textColor: '#FFFFFF',
      primaryColor: '#FFA500', // Orange
      secondaryColor: '#008000', // Green
    },
  };

  return colorScheme === 'dark' ? themeColors.dark : themeColors.light;
};