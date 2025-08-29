
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Input = ({ 
  label, 
  value, 
  onChangeText, 
  keyboardType, 
  secureTextEntry, 
  error, 
  isPassword = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error && { borderColor: 'red' }]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                showPassword
                  ? require('../../Assets/Images/eye.fill.png')
                  : require('../../Assets/Images/eye.slash.png')
              }
              resizeMode="contain"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, color: '#333' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#222',
  },
  eyeIcon: { width: 22, height: 22, tintColor: '#888', marginLeft: 8 },
  error: { fontSize: 12, color: 'red', marginTop: 4 }
});
