import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../components/BackButton";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import OtpScreen from "../screens/OtpScreen";
import ResetPassword from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "WELCOME", headerBackVisible: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
