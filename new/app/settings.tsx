import React from 'react';
import SettingsScreen from '../components/SettingsScreen';
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function SettingsRoute() {
  const colorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(colorScheme === 'dark');
  const theme = useTheme();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Here you would typically update your app's theme context
  };

  return (
    <SettingsScreen
      toggleTheme={toggleTheme}
      isDarkTheme={isDarkTheme}
    />
  );
}