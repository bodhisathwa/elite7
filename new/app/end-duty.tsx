import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, useWindowDimensions } from 'react-native';
import { Text, Card, Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from './theme';

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
  
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  useEffect(() => {
    setSummary(mockSummary);
  }, []);

  const handleEndDuty = () => {
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    setConfirmVisible(false);
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, isTablet && styles.tabletContent]}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.title, { color: theme.colors.primary }]}>End Your Duty</Text>
            
            <View style={styles.summaryContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Today's Summary:</Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>Total Hours: {summary.totalHours}</Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>First Check-in: {summary.firstCheckIn}</Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>Last Check-out: {summary.lastCheckOut}</Text>
              <Text style={[styles.value, { color: theme.colors.text }]}>Locations: {summary.locations.join(', ')}</Text>
            </View>

            <Button 
              mode="contained" 
              onPress={handleEndDuty}
              style={[styles.endDutyButton, { backgroundColor: theme.colors.accent }]}
              labelStyle={{ color: theme.colors.background }}
            >
              End Your Duty
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={confirmVisible} onDismiss={handleCancel}>
          <Dialog.Title style={{ color: theme.colors.primary }}>Confirm End of Duty</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ color: theme.colors.text }}>Are you sure you want to end your duty for today? This will finalize all check-ins and check-outs for the day.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel} color={theme.colors.text}>Cancel</Button>
            <Button onPress={handleConfirm} color={theme.colors.primary}>Confirm</Button>
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
  tabletContent: {
    paddingHorizontal: '15%',
  },
  card: {
    borderRadius: 15,
    elevation: 4,
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
