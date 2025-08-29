import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddToCartScreen from '../screens/AddToCartScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';



const Tab = createBottomTabNavigator();

// Import your asset icons
const homeIcon = require('../../Assets/Images/home.png');
const profileIcon = require('../../Assets/Images/profile.png');
const settingsIcon = require('../../Assets/Images/cart.png');

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80, // aapka custom height
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#e0e0e0' : 'transparent',
                borderRadius: 25,
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={homeIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: 'black',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={AddToCartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#e0e0e0' : 'transparent',
                borderRadius: 25,
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={settingsIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: 'black',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="item"
        component={ItemDetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#e0e0e0' : 'transparent',
                borderRadius: 25,
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={profileIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: 'black',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#e0e0e0' : 'transparent',
                borderRadius: 25,
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={profileIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: 'black',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>

  );
};

export default HomeTab;