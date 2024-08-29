import React from 'react';
import ProfileScreen from '../components/ProfileScreen';
import { theme as customTheme } from './theme';

export default function ProfileRoute() {
  return (
    <ProfileScreen theme={customTheme} />
  );
}
