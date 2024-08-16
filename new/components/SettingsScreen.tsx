import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Switch, Button, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface SettingsScreenProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export default function SettingsScreen({ toggleTheme, isDarkTheme }: SettingsScreenProps) {
  const theme = useTheme();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Here you would typically update this setting in your app's state or storage
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            // Perform logout actions here
            // For example:
            // clearUserSession();
            // resetAppState();
            router.replace('../screens/LoginScreen'); // Navigate to login screen
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.dateText, { color: theme.colors.text }]}>{dateString}</Text>
        <IconButton
          icon={isDarkTheme ? 'weather-sunny' : 'weather-night'}
          color={theme.colors.primary}
          size={24}
          onPress={toggleTheme}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            color={theme.colors.primary}
          />
        </View>

        <Button 
          mode="contained" 
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 30,
  },
});