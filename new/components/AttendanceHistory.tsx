import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, IconButton, useTheme, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, DateData } from 'react-native-calendars';

interface AttendanceRecord {
  location: string;
  checkIn: string;
  checkOut: string;
}

interface AttendanceHistoryProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export default function AttendanceHistory({ toggleTheme, isDarkTheme }: AttendanceHistoryProps) {
  const theme = useTheme();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const currentDate = new Date().toISOString().split('T')[0];

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
    // Fetch attendance records for the selected date
    fetchAttendanceRecords(day.dateString);
  };

  const fetchAttendanceRecords = (date: string) => {
    // This is where you would typically make an API call to fetch the records
    // For this example, we'll use mock data
    const mockRecords: AttendanceRecord[] = [
      { location: 'Main Office', checkIn: '09:00 AM', checkOut: '05:30 PM' },
      { location: 'Client Site', checkIn: '02:00 PM', checkOut: '04:00 PM' },
    ];
    setAttendanceRecords(mockRecords);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.dateText, { color: theme.colors.text }]}>{currentDate}</Text>
        <IconButton
          icon={isDarkTheme ? 'weather-sunny' : 'weather-night'}
          color={theme.colors.primary}
          size={24}
          onPress={toggleTheme}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Attendance History</Text>

        <Card style={styles.calendarCard}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: theme.colors.primary }
            }}
            theme={{
              backgroundColor: theme.colors.surface,
              calendarBackground: theme.colors.surface,
              textSectionTitleColor: theme.colors.primary,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: theme.colors.surface,
              todayTextColor: theme.colors.accent,
              dayTextColor: theme.colors.text,
              textDisabledColor: theme.colors.disabled,
              arrowColor: theme.colors.primary,
            }}
          />
        </Card>

        {selectedDate && (
          <Card style={styles.recordsCard}>
            <Card.Content>
              <Text style={[styles.selectedDateText, { color: theme.colors.primary }]}>
                Records for {selectedDate}
              </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Location</DataTable.Title>
                  <DataTable.Title>Check-In</DataTable.Title>
                  <DataTable.Title>Check-Out</DataTable.Title>
                </DataTable.Header>

                {attendanceRecords.map((record, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{record.location}</DataTable.Cell>
                    <DataTable.Cell>{record.checkIn}</DataTable.Cell>
                    <DataTable.Cell>{record.checkOut}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarCard: {
    marginBottom: 20,
  },
  recordsCard: {
    marginTop: 20,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});