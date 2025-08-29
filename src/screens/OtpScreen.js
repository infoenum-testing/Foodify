import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';

const OtpScreen = ({ navigation }) => {
  const length = 6; // change to 4 if needed
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text !== '' && index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== length) {
      alert(`Please enter ${length}-digit OTP`);
      return;
    }
    // 🔑 Verify OTP logic (API / Firebase etc.)
    alert(`OTP Verified: ${enteredOtp}`);
    navigation.navigate('ResetPassword'); // Next screen
  };

  const handleResend = () => {
    // 🔑 API call to resend OTP
    alert('OTP Resent!');
  };

  return (
   <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the {length}-digit code sent to your email
          </Text>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleBackspace(e, index)}
                ref={(ref) => (inputs.current[index] = ref)}
              />
            ))}
          </View>

          {/* ✅ Reusable Button */}
          <Button title="Verify" onPress={handleVerify} />

          {/* Resend OTP */}
          <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn’t receive code? </Text>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    //justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 8,
    color: '#2382AA',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 28,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  otpInput: {
    width: 50,
    height: 58,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    backgroundColor: '#f9f9f9',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  resendText: {
    fontSize: 14,
    color: '#555',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22789E',
  },
});
