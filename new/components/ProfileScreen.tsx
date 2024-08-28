import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Card, IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface ProfileScreenProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export default function ProfileScreen({ toggleTheme, isDarkTheme }: ProfileScreenProps) {
  const theme = useTheme();

  // Mock user data - replace with actual user data in your implementation
  const user = {
    name: 'John Doe',
    photo: require('../assets/images/bdp.jpg'),
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Software Developer'
  };

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={120}
            source={ user.photo }
            style={styles.profilePhoto}
          />
          <Text style={[styles.nameText, { color: theme.colors.primary }]}>{user.name}</Text>
        </View>

        <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Email:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Phone:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Employee ID:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.employeeId}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Department:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.department}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.colors.text }]}>Position:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{user.position}</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePhoto: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoCard: {
    borderRadius: 15,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
  },
});