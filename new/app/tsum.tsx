import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Text, Card, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';

// Mock data for demonstration
const mockData = [
  { id: 1, type: 'Check-in', time: '09:00 AM', location: 'Office A' },
  { id: 2, type: 'Check-out', time: '01:00 PM', location: 'Office A' },
  { id: 3, type: 'Check-in', time: '02:00 PM', location: 'Client Site' },
  { id: 4, type: 'Check-out', time: '06:00 PM', location: 'Client Site' },
];

interface CheckRecord {
  id: number;
  type: string;
  time: string;
  location: string;
}

export default function TodaySummaryScreen() {
  const [totalHours, setTotalHours] = useState<string>('');
  const [breakdownHours, setBreakdownHours] = useState<string[]>([]);
  const [checkRecords, setCheckRecords] = useState<CheckRecord[]>([]);
  
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  useEffect(() => {
    setCheckRecords(mockData);
    calculateHours(mockData);
  }, []);

  const calculateHours = (records: CheckRecord[]) => {
    let totalMinutes = 0;
    let breakdowns: string[] = [];

    for (let i = 0; i < records.length; i += 2) {
      if (i + 1 < records.length) {
        const checkIn = new Date(`2023-01-01 ${records[i].time}`);
        const checkOut = new Date(`2023-01-01 ${records[i + 1].time}`);
        const diff = (checkOut.getTime() - checkIn.getTime()) / 1000 / 60;
        totalMinutes += diff;
        breakdowns.push(`${records[i].location}: ${formatHours(diff)}`);
      }
    }

    setTotalHours(formatHours(totalMinutes));
    setBreakdownHours(breakdowns);
  };

  const formatHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, isTablet && styles.tabletContent]}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Today's Summary</Text>
            
            <View style={styles.summaryContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Total Hours Worked Today:</Text>
              <Text style={[styles.value, { color: theme.colors.accent }]}>{totalHours}</Text>
            </View>

            <View style={styles.breakdownContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Breakdown of Hours:</Text>
              {breakdownHours.map((breakdown, index) => (
                <Text key={index} style={[styles.value, { color: theme.colors.text }]}>{breakdown}</Text>
              ))}
            </View>

            <Text style={[styles.label, { color: theme.colors.text, marginTop: 20 }]}>Check-in/Check-out Records:</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{ color: theme.colors.primary }}>Type</DataTable.Title>
                <DataTable.Title textStyle={{ color: theme.colors.primary }}>Time</DataTable.Title>
                <DataTable.Title textStyle={{ color: theme.colors.primary }}>Location</DataTable.Title>
              </DataTable.Header>

              {checkRecords.map((record) => (
                <DataTable.Row key={record.id}>
                  <DataTable.Cell textStyle={{ color: theme.colors.text }}>{record.type}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: theme.colors.text }}>{record.time}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: theme.colors.text }}>{record.location}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  tabletContent: {
    paddingHorizontal: '10%',
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
  breakdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 5,
  },
});
