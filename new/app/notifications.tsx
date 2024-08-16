import React from 'react';
import NotificationsScreen from '../components/NotificationsScreen';
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function NotificationsRoute() {
  const colorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(colorScheme === 'dark');
  const theme = useTheme();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Here you would typically update your app's theme context
  };

  return (
    <NotificationsScreen
      toggleTheme={toggleTheme}
      isDarkTheme={isDarkTheme}
    />
  );
}