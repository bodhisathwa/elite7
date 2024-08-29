import React from 'react';
import AttendanceHistory from '../components/AttendanceHistory';
import { useTheme } from 'react-native-paper';

export default function AttendanceHistoryRoute() {
  const theme = useTheme();

  return (
    <AttendanceHistory />
  );
}