import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Card, TextInput, useTheme, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

// Import your color theme
import { colors } from '../constants/Colors';

export default function ManualCheckInScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleLocationSelect = (itemValue: string) => {
    setSelectedLocation(itemValue);
  };

  const handleCaptureSelfie = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      setSnackbarMessage('Camera permission is required to capture selfie');
      setSnackbarVisible(true);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirmCheckIn = async () => {
    if (!selectedLocation || !image || !location) {
      setSnackbarMessage('Please fill all the required fields');
      setSnackbarVisible(true);
      return;
    }

    // TODO: Implement the API call to send check-in data to the backend
    // This should include: selectedLocation, image, location.coords

    // For now, we'll just simulate a successful check-in
    setSnackbarMessage('Check-in successful!');
    setSnackbarVisible(true);

    // Navigate back to the main screen after a short delay
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[styles.title, { color: colors.primary }]}>Manual Check-In</Text>
            
            <View style={styles.pickerContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Select Location:</Text>
              <Picker
                selectedValue={selectedLocation}
                onValueChange={handleLocationSelect}
                style={[styles.picker, { color: colors.text }]}
              >
                <Picker.Item label="Select a location" value="" />
                <Picker.Item label="Office A" value="officeA" />
                <Picker.Item label="Office B" value="officeB" />
                <Picker.Item label="Client Site" value="clientSite" />
                <Picker.Item label="Home" value="home" />
              </Picker>
            </View>

            <View style={styles.selfieContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Capture Selfie:</Text>
              <Button 
                mode="contained" 
                onPress={handleCaptureSelfie}
                style={[styles.button, { backgroundColor: colors.accent }]}
              >
                Capture Selfie
              </Button>
              {image && <Image source={{ uri: image }} style={styles.selfieImage} />}
            </View>

            {location && (
              <View style={styles.locationInfo}>
                <Text style={[styles.label, { color: colors.text }]}>Current Location:</Text>
                <Text style={[styles.locationText, { color: colors.text }]}>
                  Latitude: {location.coords.latitude}
                </Text>
                <Text style={[styles.locationText, { color: colors.text }]}>
                  Longitude: {location.coords.longitude}
                </Text>
              </View>
            )}

            <Button 
              mode="contained" 
              onPress={handleConfirmCheckIn}
              style={[styles.confirmButton, { backgroundColor: colors.primary }]}
            >
              Confirm Check-In
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: colors.accent }]}
      >
        {snackbarMessage}
      </Snackbar>
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
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  selfieContainer: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  selfieImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 10,
  },
  locationInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
  },
  confirmButton: {
    marginTop: 20,
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});