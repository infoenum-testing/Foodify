import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { AuthService } from "../../FirebaseManager/authService";


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSignup = async () => {
    let newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (mobile.length < 10) newErrors.mobile = 'Invalid mobile number';
    if (!validatePassword(password)) newErrors.password = 'Weak password';
    if (password !== confirmPassword) newErrors.confirm = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      try {
        await AuthService.signUp(email, password, name);
        navigation.navigate('HomeTab');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />
        <Input
          label="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          error={errors.mobile}
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword
          error={errors.confirm}
        />

        <Button title="Sign Up" onPress={onSignup} />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.link}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2382AA',
    textAlign: 'center',
    marginBottom: 30
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'black'
  },
  link: {
    color: '#2382AA',
    fontWeight: '600'
  }
});
