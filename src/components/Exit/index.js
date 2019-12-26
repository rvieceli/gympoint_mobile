import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Exit({ navigation }) {
  console.tron.log(navigation);
  async function handleLogout() {
    await AsyncStorage.removeItem('@GymPoint:student');

    navigation.navigate('SignIn');
  }

  return (
    <Icon
      name="exit-to-app"
      size={20}
      color="#ee4e62"
      style={{ marginRight: 20 }}
      onPress={handleLogout}
    />
  );
}
