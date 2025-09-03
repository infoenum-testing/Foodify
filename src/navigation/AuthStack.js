import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import OtpScreen from "../screens/OtpScreen";
import ResetPassword from "../screens/ResetPasswordScreen";
import EditProflie from "../screens/EditProfileScreen";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import CategoryProductsScreen from "../screens/CategoryProductsScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import HomeTab from "./HomeTab";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();

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
        options={{
          title: "",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{
          title: "",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: "",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="EditProflie"
        component={EditProflie}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreen}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
