import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text, useTheme, Provider as PaperProvider } from 'react-native-paper';
import { Image } from 'expo-image';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleLogin = async () => {
    // TODO: Implement login logic
    console.log('Login attempt with:', username, password);
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log('Forgot password');
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
          >
            Login
          </Button>
          <Button
            mode="text"
            onPress={handleForgotPassword}
            style={styles.forgotPasswordButton}
          >
            Forgot Password?
          </Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 100,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 10,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
});

export default LoginScreen;