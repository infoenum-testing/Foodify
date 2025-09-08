import React from "react";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function AppNavigator() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <AppStack /> : <AuthStack />;
}
