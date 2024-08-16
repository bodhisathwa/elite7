import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, IconButton, useTheme, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

// Assume we have a user object from our database
interface User {
  id: string;
  name: string;
  profilePicture: string;
}

export default function MainScreen() {
  const [currentStatus, setCurrentStatus] = useState('Checked Out');
  const [currentLocation, setCurrentLocation] = useState('Unknown');
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [checkInCount, setCheckInCount] = useState(0);
  const [checkOutCount, setCheckOutCount] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from the database
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // TODO: Implement actual API call to fetch user data
    // This is a placeholder implementation
    const userData: User = {
      id: '1',
      name: 'John Doe',
      profilePicture: 'https://example.com/profile-pic.jpg'
    };
    setUser(userData);
  };

  useEffect(() => {
    // Simulated effect to check user's location
    const checkLocation = () => {
      // This should be replaced with actual geolocation logic
      const randomInRadius = Math.random() > 0.5;
      setIsWithinRadius(randomInRadius);
      setCurrentLocation(randomInRadius ? 'Within office radius' : 'Outside office radius');
    };

    const intervalId = setInterval(checkLocation, 60000); // Check every minute
    checkLocation(); // Initial check

    return () => clearInterval(intervalId);
  }, []);
 
  const handleCheckIn = () => {
    // TODO: Implement check-in logic with backend
    setCurrentStatus('Checked In');
    setCheckInCount(prev => prev + 1);
  };

  const handleCheckOut = () => {
    // TODO: Implement check-out logic with backend
    setCurrentStatus('Checked Out');
    setCheckOutCount(prev => prev + 1);
  };

  const handleManualCheckIn = () => {
    router.push('/manual-check-in');
  };
  
  const handleManualCheckOut = () => {
    router.push('/manual-check-out');
  };

  const handleTodaySummary = () => {
    // TODO: Navigate to today's summary screen
    router.push('/tsum');
  };

  const handleEndDuty = () => {
    // TODO: Navigate to end duty confirmation screen
    router.push('/end-duty');
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeColors = {
    background: isDarkTheme ? '#000000' : '#ffffff',
    text: isDarkTheme ? '#ffffff' : '#000000',
    accent: '#FFD700', // Golden Yellow
    secondary: '#808080', // Grey
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.statusBar}>
        <Text style={{ color: themeColors.text }}>{new Date().toDateString()}</Text>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.statusBarRight}>
          <IconButton 
            icon="bell" 
            onPress={() => router.push('./notifications')} 
            iconColor={themeColors.text}
          />
          <IconButton 
            icon={isDarkTheme ? 'weather-sunny' : 'weather-night'} 
            onPress={toggleTheme} 
            iconColor={themeColors.accent}
          />
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {user && (
          <Card style={styles.profileCard}>
            <Card.Content style={styles.profileCardContent}>
              <Avatar.Image 
                size={100} 
                source={{ uri: user.profilePicture }}
                style={styles.avatar}
              />
              <Text style={[styles.employeeName, { color: themeColors.text }]}>{user.name}</Text>
            </Card.Content>
          </Card>
        )}
        
        <Card style={[styles.card, { backgroundColor: currentStatus === 'Checked In' ? '#e6ffe6' : '#ffe6e6' }]}>
          <Card.Content>
            <Text style={styles.cardTitle}>Current Status: {currentStatus}</Text>
            <Text style={styles.cardContent}>Current Location: {currentLocation}</Text>
          </Card.Content>
        </Card>
        
        {!isWithinRadius && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Manual Entry</Text>
              <View style={styles.buttonContainer}>
                <Button 
                  mode="contained" 
                  onPress={handleManualCheckIn} 
                  disabled={currentStatus === 'Checked In'}
                >
                  Check In
                </Button>
                <Button 
                  mode="contained" 
                  onPress={handleManualCheckOut}
                  disabled={currentStatus === 'Checked Out'}
                >
                  Check Out
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
        
        <View style={styles.summaryContainer}>
          <Button mode="outlined" onPress={handleTodaySummary} style={styles.summaryButton}>
            Today's Summary
          </Button>
          <Card style={styles.countCard}>
            <Card.Content>
              <Text style={{ color: themeColors.text }}>Check-ins: {checkInCount}</Text>
              <Text style={{ color: themeColors.text }}>Check-outs: {checkOutCount}</Text>
            </Card.Content>
          </Card>
        </View>

        <Button 
          mode="contained" 
          onPress={handleEndDuty} 
          style={styles.endDutyButton}
          labelStyle={styles.endDutyButtonLabel}
        >
          End Your Duty
        </Button>
      </ScrollView>
      
      <View style={[styles.bottomNav, { backgroundColor: themeColors.secondary }]}>
        <IconButton icon="home" onPress={() => console.log('Home')} iconColor={themeColors.text} />
        <IconButton icon="history" onPress={() => router.push('./attendance-history')} iconColor={themeColors.text} />
        <IconButton icon="account" onPress={() => router.push('./profile')} iconColor={themeColors.text} />
        <IconButton icon="cog" onPress={() => router.push('./settings')} iconColor={themeColors.text} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 150,
    height: 60,
  },
  statusBarRight: {
    flexDirection: 'row',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
  },
  profileCardContent: {
    alignItems: 'center',
    padding: 20,
  },
  employeeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryButton: {
    flex: 1,
    marginRight: 10,
  },
  countCard: {
    flex: 1,
    padding: 10,
  },
  endDutyButton: {
    marginTop: 20,
    padding: 10,
  },
  endDutyButtonLabel: {
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  avatar: {
    marginBottom: 10,
  },
});
