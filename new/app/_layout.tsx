// app/_layout.tsx

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="otp-verification" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}