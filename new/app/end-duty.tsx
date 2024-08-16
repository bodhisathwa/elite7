import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Dialog, Portal, Paragraph, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Import your color theme
import { colors } from '../constants/Colors';

// Mock data for demonstration
const mockSummary = {
  totalHours: '8h 30m',
  firstCheckIn: '09:00 AM',
  lastCheckOut: '06:30 PM',
  locations: ['Office A', 'Client Site'],
};

export default function EndDutyScreen() {
  const [summary, setSummary] = useState(mockSummary);
  const [confirmVisible, setConfirmVisible] = useState(false);
  
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch the day's summary from your backend
    // For now, we'll use the mock data
    setSummary(mockSummary);
  }, []);

  const handleEndDuty = () => {
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    setConfirmVisible(false);
    // TODO: Implement the API call to finalize the day's duty
    // This should include sending the final check-out time and any other necessary data

    // For now, we'll just simulate a successful end of duty
    Alert.alert(
      "Duty Ended",
      "Your duty for today has been successfully ended. Have a great evening!",
      [{ text: "OK", onPress: () => router.push('/') }]
    );
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[styles.title, { color: colors.primary }]}>End Your Duty</Text>
            
            <View style={styles.summaryContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Today's Summary:</Text>
              <Text style={[styles.value, { color: colors.text }]}>Total Hours: {summary.totalHours}</Text>
              <Text style={[styles.value, { color: colors.text }]}>First Check-in: {summary.firstCheckIn}</Text>
              <Text style={[styles.value, { color: colors.text }]}>Last Check-out: {summary.lastCheckOut}</Text>
              <Text style={[styles.value, { color: colors.text }]}>Locations: {summary.locations.join(', ')}</Text>
            </View>

            <Button 
              mode="contained" 
              onPress={handleEndDuty}
              style={[styles.endDutyButton, { backgroundColor: colors.accent }]}
            >
              End Your Duty
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={confirmVisible} onDismiss={handleCancel}>
          <Dialog.Title>Confirm End of Duty</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to end your duty for today? This will finalize all check-ins and check-outs for the day.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleConfirm}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  endDutyButton: {
    marginTop: 20,
  },
});