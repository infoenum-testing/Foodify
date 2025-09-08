import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BackButton from "../components/BackButton";

import HomeTab from "./HomeTab";
import EditProfile from "../screens/EditProfileScreen";
import ItemDetailsScreen from "../screens/itemDetails/ItemDetailsScreen";
import CategoryProductsScreen from "../screens/CategoryProductsScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
