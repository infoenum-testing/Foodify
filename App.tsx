import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppNavigator from "./src/navigation/AppNavigator";
import { store, persistor } from "./src/redux/store";
import { AuthService } from "./FirebaseManager/authService";
import { setLoggedIn, setLoggedOut } from "./src/redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    SplashScreen.hide();

    const unsubscribe = AuthService.listenToAuthChanges((user) => {
      if (user) {
        dispatch(setLoggedIn());
      } else {
        dispatch(setLoggedOut());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
