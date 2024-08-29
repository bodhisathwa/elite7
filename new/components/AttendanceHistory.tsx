import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme, DataTable } from 'react-native-paper';
import { Calendar, DateData } from 'react-native-calendars';
import { theme } from '../app/theme';

interface AttendanceRecord {
  location: string;
  checkIn: string;
  checkOut: string;
}

export default function AttendanceHistory() {
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const currentDate = new Date().toISOString().split('T')[0];

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
    fetchAttendanceRecords(day.dateString);
  };

  const fetchAttendanceRecords = (date: string) => {
    const mockRecords: AttendanceRecord[] = [
      { location: 'Main Office', checkIn: '09:00 AM', checkOut: '05:30 PM' },
      { location: 'Client Site', checkIn: '02:00 PM', checkOut: '04:00 PM' },
    ];
    setAttendanceRecords(mockRecords);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Attendance History</Text>

        <Card style={[styles.calendarCard, { backgroundColor: theme.colors.surface }]}>
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
              monthTextColor: theme.colors.primary,
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
            }}
          />
        </Card>

        {selectedDate && (
          <Card style={[styles.recordsCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.selectedDateText, { color: theme.colors.secondary }]}>
                Records for {selectedDate}
              </Text>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title textStyle={styles.tableHeaderText}>Location</DataTable.Title>
                  <DataTable.Title textStyle={styles.tableHeaderText}>Check-In</DataTable.Title>
                  <DataTable.Title textStyle={styles.tableHeaderText}>Check-Out</DataTable.Title>
                </DataTable.Header>

                {attendanceRecords.map((record, index) => (
                  <DataTable.Row key={index} style={styles.tableRow}>
                    <DataTable.Cell textStyle={styles.tableCell}>{record.location}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableCell}>{record.checkIn}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableCell}>{record.checkOut}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  calendarCard: {
    marginBottom: 16,
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  recordsCard: {
    marginTop: 16,
    borderRadius: theme.roundness,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  tableCell: {
    color: theme.colors.text,
  },
});