// app/otp-verification.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const router = useRouter();

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      (refs[index + 1] as any).focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
    router.push('/dashboard');
  };

  const refs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>OTP Verification</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={refs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>
        <Button mode="contained" onPress={handleVerify} style={styles.button} color="#FF8C00">
          Verify
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#006400',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#006400',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
  },
});