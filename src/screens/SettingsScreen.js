import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      <View style={{ marginTop: 40, width: '60%' }}>
        <Button
          title="Logout"
          color="red"
          onPress={() => alert('Logout Clicked')}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
  },
});
