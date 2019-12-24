import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Container } from './styles';

export default function StartUp({ navigation }) {
  useEffect(() => {
    async function load() {
      const student = await AsyncStorage.getItem('@GymPoint:student');

      if (!student) return navigation.navigate('SignIn');

      return navigation.navigate('CheckIn');
    }

    load();
  }, [navigation]);

  return (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" />
    </Container>
  );
}
