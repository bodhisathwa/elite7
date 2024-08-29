import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, Card, IconButton, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../app/theme';



interface Notification {
  id: string;
  type: 'check-in' | 'check-out' | 'message';
  content: string;
  timestamp: Date;
}

export default function NotificationsScreen() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockNotifications: Notification[] = [
          { id: '1', type: 'check-in', content: 'You checked in at 9:00 AM', timestamp: new Date(2024, 7, 16, 9, 0) },
          { id: '2', type: 'check-out', content: 'You checked out at 5:30 PM', timestamp: new Date(2024, 7, 16, 17, 30) },
          { id: '3', type: 'message', content: 'Remember to submit your weekly report', timestamp: new Date(2024, 7, 16, 14, 0) },
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
          <Text style={styles.notificationType}>
            {item.type === 'check-in' ? 'Check-In' : item.type === 'check-out' ? 'Check-Out' : 'Message'}
          </Text>
        </View>
        <Text style={styles.notificationContent}>{item.content}</Text>
        <Text style={styles.notificationTimestamp}>
          {item.timestamp.toLocaleString()}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: theme.colors.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    color: theme.colors.primary,
  },
  notificationContent: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
  notificationTimestamp: {
    fontSize: 14,
    opacity: 0.7,
    color: theme.colors.text,
  },
});