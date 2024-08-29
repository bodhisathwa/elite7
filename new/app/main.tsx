import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, IconButton, Provider as PaperProvider, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { theme } from './theme';

const STATUS_COLORS = {
  checkedIn: '#7DDA58',
  checkedOut: '#FC4E50',
};

const { width } = Dimensions.get('window');

interface User {
  id: string;
  name: string;
  profilePicture?: string;
}

export default function MainScreen() {
  const [currentStatus, setCurrentStatus] = useState('Checked Out');
  const [currentLocation, setCurrentLocation] = useState('Unknown');
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [checkInCount, setCheckInCount] = useState(0);
  const [checkOutCount, setCheckOutCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData: User = {
      id: '1',
      name: 'John Doe',
      // Leave profilePicture undefined to use default image
    };
    setUser(userData);
  };

  useEffect(() => {
    const checkLocation = () => {
      const randomInRadius = Math.random() > 0.5;
      setIsWithinRadius(randomInRadius);
      setCurrentLocation(randomInRadius ? 'Within office radius' : 'Outside office radius');
    };

    const intervalId = setInterval(checkLocation, 60000);
    checkLocation();

    return () => clearInterval(intervalId);
  }, []);

  const handleManualCheckIn = () => {
    router.push('/manual-check-in');
  };
  
  const handleManualCheckOut = () => {
    router.push('/manual-check-out');
  };

  const handleTodaySummary = () => {
    router.push('/tsum');
  };

  const handleEndDuty = () => {
    router.push('/end-duty');
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View style={styles.statusBar}>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.statusBarRight}>
            <IconButton 
              icon="bell" 
              onPress={() => router.push('./notifications')} 
              iconColor={theme.colors.primary}
            />
          </View>
        </View>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {user && (
            <Card style={styles.profileCard}>
              <Card.Content style={styles.profileCardContent}>
                <Avatar.Image 
                  size={width * 0.4} 
                  source={user.profilePicture ? { uri: user.profilePicture } : require('../assets/logo.png')}
                  style={styles.avatar}
                />
                <Text style={styles.employeeName}>{user.name}</Text>
              </Card.Content>
            </Card>
          )}
          <Card style={[styles.card, { backgroundColor: currentStatus === 'Checked In' ? STATUS_COLORS.checkedIn : STATUS_COLORS.checkedOut }]}>
            <Card.Content>
              <Text style={[styles.cardTitle, styles.statusText]}>Current Status: {currentStatus}</Text>
              <Text style={[styles.cardContent, styles.statusText]}>Current Location: {currentLocation}</Text>
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
                    style={styles.actionButton}
                  >
                    Check In
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={handleManualCheckOut}
                    disabled={currentStatus === 'Checked Out'}
                    style={styles.actionButton}
                  >
                    Check Out
                  </Button>
                </View>
              </Card.Content>
            </Card>
          )}
          
          <View style={styles.summaryContainer}>
            <Card style={styles.countCard}>
              <Card.Content>
                <Text style={styles.countText}>Check-ins: {checkInCount}</Text>
                <Text style={styles.countText}>Check-outs: {checkOutCount}</Text>
              </Card.Content>
            </Card>
          </View>

          <Button 
            mode="contained" 
            onPress={handleTodaySummary} 
            style={styles.summaryButton}
          >
            Today's Summary
          </Button>

          <Button 
            mode="contained" 
            onPress={handleEndDuty} 
            style={styles.endDutyButton}
            labelStyle={styles.endDutyButtonLabel}
          >
            End Your Duty
          </Button>
        </ScrollView>
        
        <View style={styles.bottomNav}>
          <IconButton icon="home" onPress={() => console.log('Home')} iconColor={theme.colors.primary} />
          <IconButton icon="history" onPress={() => router.push('./attendance-history')} iconColor={theme.colors.primary} />
          <IconButton icon="account" onPress={() => router.push('./profile')} iconColor={theme.colors.primary} />
          <IconButton icon="cog" onPress={() => router.push('./settings')} iconColor={theme.colors.primary} />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dateText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  logo: {
    width: width * 0.3,
    height: width * 0.12,
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
    color: theme.colors.primary,
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
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryButton: {
    marginBottom: 20,
    backgroundColor: theme.colors.accent,
  },
  countCard: {
    padding: 10,
  },
  countText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
  endDutyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  endDutyButtonLabel: {
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.accent,
    backgroundColor: theme.colors.background,
  },
  avatar: {
    marginBottom: 10,
  },
  statusText: {
    color: 'black', // This will make the text black for both title and content
  },
});