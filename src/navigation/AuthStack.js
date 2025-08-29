import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import ResetPassword from '../screens/ResetPasswordScreen'; 
import EditProflie from '../screens/EditProfileScreen'; 

import HomeTab from './HomeTab';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'WELCOME', headerBackVisible: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: '' }} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ title: '' }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: '' }} />
       <Stack.Screen name="EditProflie" component={EditProflie} options={{ headerShown: true }} />
      <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;