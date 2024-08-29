// app/dashboard.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, Avatar, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { theme } from './theme';

const { width, height } = Dimensions.get('window');

const fetchUserData = async () => {
  // Simulating API call
  return {
    name: 'John Doe',
    photo: 'https://via.placeholder.com/150',
    todayStatus: 'ON DUTY', // This would come from the admin panel
    workingLocation: 'Main Office',
    events: [
      { id: 1, title: 'Team Meeting', time: '2:00 PM' },
      { id: 2, title: 'Project Deadline', time: '5:00 PM' },
    ],
  };
};

export default function DashboardScreen() {
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };

    loadUserData();

    // Update time every second
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    router.push('/main');
  };

  if (!userData) {
    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Text>Loading...</Text>
        </SafeAreaView>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.welcomeText}>Welcome, {userData.name}!</Text>
          <Avatar.Image size={width * 0.4} source={{ uri: userData.photo }} style={styles.avatar} />
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.dateText}>
                {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
              <Text style={styles.timeText}>
                {currentDate.toLocaleTimeString('en-US')}
              </Text>
              <Text style={styles.statusText}>Today Status: {userData.todayStatus}</Text>
              <Text style={styles.locationText}>Working Location: {userData.workingLocation}</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.eventsTitle}>Upcoming Events:</Text>
              {userData.events.map((event) => (
                <Text key={event.id} style={styles.eventItem}>
                  • {event.title} at {event.time}
                </Text>
              ))}
            </Card.Content>
          </Card>
          <Button mode="contained" onPress={handleContinue} style={styles.button}>
            Continue
          </Button>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: height * 0.15,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  avatar: {
    marginBottom: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.accent,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.colors.primary,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.primary,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.accent,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  eventItem: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: theme.colors.accent,
  },
});