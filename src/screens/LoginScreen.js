
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';

// Custom components + utils
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { AuthService } from '../../FirebaseManager/authService';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const loginButtonTapped = async () => {
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }
        if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters and contain a number';
            valid = false;
        }

        setErrors(newErrors);
        if (!valid) return;
            try {
        await AuthService.login(email, password);
        navigation.navigate('HomeTab');
    } catch (error) {
        Alert.alert('Login Failed', error.message);
    }
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Input
                label="Email"
                value={email}
                onChangeText={text => {
                    setEmail(text);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                keyboardType="email-address"
                error={errors.email}
            />

            <Input
                label="Password"
                value={password}
                onChangeText={text => {
                    setPassword(text);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                isPassword
                error={errors.password}
            />

            {/* Login Button */}
            <Button title="Login" onPress={loginButtonTapped} />

            {/* Forgot Password link */}
            <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                    Don’t have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}> --------- OR --------</Text>

            // Google Sign-In 
            <GoogleSigninButton
                style={styles.socialButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => { }}
            />

            // Apple Sign-In 
            {Platform.OS === 'ios' && (
                <AppleButton
                    style={styles.socialButton}
                    cornerRadius={5}
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.SIGN_IN}
                    onPress={() => { }}
                />
            )}
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#2382AA',
        marginBottom: 32,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: 8,
    },
    forgotPasswordText: {
        color: '#2382AA',
        fontSize: 14,
        fontWeight: '500',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    signUpText: {
        color: 'black',
        fontSize: 16,
    },
    signUpLink: {
        color: '#2382AA',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 16,
        color: '#888',
        fontSize: 16,
    },
    socialButton: {
        width: '100%',
        height: 48,
        marginBottom: 12,
        alignSelf: 'center',
    },
});

export default LoginScreen;
