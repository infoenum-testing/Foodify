import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AuthStack from "./src/navigation/AuthStack";
import HomeTab from "./src/navigation/HomeTab"; 
import { store, persistor } from "./src/redux/store";

// 🔹 AppNavigator component to decide initial route
const AppNavigator = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <HomeTab /> : <AuthStack />;
};

function App() {
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    SplashScreen.hide(); 
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
