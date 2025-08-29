// src/Screens/Auth/ResetPasswordScreen.js
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '../components/Input';
import Button from '../components/Button';
import { validatePassword } from '../utils/validations';

const ResetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const runValidation = () => {
    let isValid = true;

    // strength check using shared util
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters and include a number.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // confirm check
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmError('');
    }

    return isValid;
  };

  const handleReset = () => {
    if (!runValidation()) return;

    // 🔑 Call your API / Firebase password reset logic here
    Alert.alert('Success', 'Your password has been reset!');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your new password below</Text>

        {/* 🔒 New Password (eye toggle via Input's isPassword) */}
        <Input
          label="New Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
          isPassword
          error={passwordError}
        />

        {/* 🔒 Confirm Password (eye toggle via Input's isPassword) */}
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (confirmError) setConfirmError('');
          }}
          isPassword
          error={confirmError}
        />

        <Button title="Reset Password" onPress={handleReset} />
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>);
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 8,
    color: '#2382AA',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 24,
    textAlign: 'center',
  },
});
