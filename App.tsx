
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AuthStack from "./src/navigation/AuthStack";
import { store, persistor } from "./src/redux/store";

function App() {
  const isDarkMode = useColorScheme() === "dark";
  const [initialRoute, setInitialRoute] = useState("Welcome");

  useEffect(() => {
    SplashScreen.hide();
    // TODO: Add AsyncStorage logic to decide initial route (like check if logged in)
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;