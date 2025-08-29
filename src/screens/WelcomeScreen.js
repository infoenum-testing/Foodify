import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
  <ImageBackground
  source={require('../../Assets/Images/PreLogin/welcomeIcon.png')}
  style={styles.backgroundImage}
  resizeMode="stretch"
>


      <View style={styles.containerOverlay}>
        <Text style={styles.title}>Get your groceries{"\n"}delivered to your home</Text>
        <Text style={styles.subtitle}>
          The best delivery app in town for{"\n"}delivering your daily fresh groceries
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Shop now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
  backgroundImage: {
    flex: 1,
  },
  containerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(247, 250, 252, 0.36)',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2382AA',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomImageContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  bottomImage: {
    width: width,
    height: 200,
  },
});

export default WelcomeScreen;
