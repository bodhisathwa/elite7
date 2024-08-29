import React from 'react';
import NotificationsScreen from '../components/NotificationsScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './theme';

export default function NotificationsRoute() {
  return (
    <PaperProvider theme={theme}>
      <NotificationsScreen />
    </PaperProvider>
  );
}