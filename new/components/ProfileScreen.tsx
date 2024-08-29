import React from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Text, Avatar, Card, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../app/theme';

interface ProfileScreenProps {
  theme: typeof theme;
}

export default function ProfileScreen({ theme }: ProfileScreenProps) {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const user = {
    name: 'John Doe',
    photo: require('../assets/images/bdp.jpg'),
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Software Developer'
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, isTablet && styles.tabletContent]}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={isTablet ? 160 : 120}
            source={user.photo}
            style={styles.profilePhoto}
          />
          <Text style={[styles.nameText, { color: theme.colors.primary }]}>{user.name}</Text>
        </View>

        <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            {Object.entries(user).map(([key, value]) => {
              if (key !== 'name' && key !== 'photo') {
                return (
                  <View key={key} style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.colors.text }]}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Text>
                    <Text style={[styles.infoValue, { color: theme.colors.text }]}>{value}</Text>
                  </View>
                );
              }
            })}
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
    paddingHorizontal: '15%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePhoto: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoCard: {
    borderRadius: 15,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    flex: 2,
    textAlign: 'right',
  },
});
