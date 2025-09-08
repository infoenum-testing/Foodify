import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useDispatch } from "react-redux";

// Custom components
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validateEmail, validatePassword } from "../../utils/validations";
import { AuthService } from "../../../FirebaseManager/authService";
import { setLoggedIn } from "../../redux/authSlice";
import CustomAlert from "../../components/CustomAlert";
import styles from "./LoginScreenStyle";



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // Show alert helper
  const showAlert = (title, message, onConfirm = null, showCancel = true) => {
    setAlertConfig({ visible: true, title, message, onConfirm, showCancel });
  };

  const loginButtonTapped = async () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters and contain a number";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await AuthService.login(email, password);
      dispatch(setLoggedIn());
    } catch (error) {
      showAlert(
        "Login Failed",
        "Something went wrong. Please try again.",
        () => {
          setAlertConfig({ ...alertConfig, visible: false });
        },
        false
      );
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
        }}
        keyboardType="email-address"
        error={errors.email}
      />

      <Input
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
        }}
        isPassword
        error={errors.password}
      />

      <Button title="Login" onPress={loginButtonTapped} />

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* OR Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Sign-In */}
      <GoogleSigninButton
        style={styles.socialButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => { }}
      />

      {/* Apple Sign-In */}
      {Platform.OS === "ios" && (
        <AppleButton
          style={styles.socialButton}
          cornerRadius={5}
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          onPress={() => { }}
        />

      )}
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
        onConfirm={
          alertConfig.onConfirm
            ? () => {
              alertConfig.onConfirm();
              setAlertConfig({ ...alertConfig, visible: false });
            }
            : null
        }
        showCancel={alertConfig.showCancel ?? true}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
