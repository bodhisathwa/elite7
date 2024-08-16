import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface Notification {
  id: string;
  type: 'check-in' | 'check-out' | 'message';
  content: string;
  timestamp: Date;
}

interface NotificationsScreenProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export default function NotificationsScreen({ toggleTheme, isDarkTheme }: NotificationsScreenProps) {
  const theme = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Simulating fetching notifications from an API
    const fetchNotifications = async () => {
      try {
        // Replace this with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network delay
        const mockNotifications: Notification[] = [
          { id: '1', type: 'check-in', content: 'You checked in at 9:00 AM', timestamp: new Date(2024, 7, 16, 9, 0) },
          { id: '2', type: 'check-out', content: 'You checked out at 5:30 PM', timestamp: new Date(2024, 7, 16, 17, 30) },
          { id: '3', type: 'message', content: 'Remember to submit your weekly report', timestamp: new Date(2024, 7, 16, 14, 0) },
          // Add more mock notifications as needed
        ];
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <Card style={styles.notificationCard}>
      <Card.Content>
        <View style={styles.notificationHeader}>
          <IconButton
            icon={item.type === 'check-in' ? 'login' : item.type === 'check-out' ? 'logout' : 'message'}
            size={24}
            color={theme.colors.primary}
          />
          <Text style={[styles.notificationType, { color: theme.colors.primary }]}>
            {item.type === 'check-in' ? 'Check-In' : item.type === 'check-out' ? 'Check-Out' : 'Message'}
          </Text>
        </View>
        <Text style={[styles.notificationContent, { color: theme.colors.text }]}>{item.content}</Text>
        <Text style={[styles.notificationTimestamp, { color: theme.colors.text }]}>
          {item.timestamp.toLocaleString()}
        </Text>
      </Card.Content>
    </Card>
  );

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

      <Text style={[styles.title, { color: theme.colors.primary }]}>Notifications</Text>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.notificationList}
        />
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationList: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    marginBottom: 15,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationTimestamp: {
    fontSize: 14,
    opacity: 0.7,
  },
});