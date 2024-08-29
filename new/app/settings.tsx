import React from 'react';
import SettingsScreen from '../components/SettingsScreen';
import { theme } from './theme';

export default function SettingsRoute() {
  return (
    <SettingsScreen theme={theme} />
  );
}
