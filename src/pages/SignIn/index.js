import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import {
  Container,
  Logo,
  Form,
  Input,
  SubmitButton,
  ErrorMessage,
} from './styles';

export default function SignIn({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [error, setError] = useState();

  async function handleSubmit() {
    if (!studentId) return;

    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post(`/students/${studentId}/login`);

      await AsyncStorage.setItem('@GymPoint:student', JSON.stringify(data));

      navigation.navigate('CheckIn');
    } catch (err) {
      setLoading(false);

      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Não foi possível verificar');
      }
    }
  }

  return (
    <Container style={{ alignContent: 'center', justifyContent: 'center' }}>
      <Logo source={logo} />
      <Form>
        <Input
          keyboardType="number-pad"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={studentId}
          onChangeText={setStudentId}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
