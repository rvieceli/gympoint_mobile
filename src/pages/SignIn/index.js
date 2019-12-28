import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { Alert } from 'react-native';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import {
  Container,
  Logo,
  Form,
  Input,
  Name,
  SubmitButton,
  LinkButton,
  LinkText,
  Strong,
} from './styles';

export default function SignIn({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [token, setToken] = useState(null);

  const [student, setStudent] = useState();

  async function handleSubmit() {
    if (!studentId) return;

    setLoading(true);

    try {
      const { data } = await api.post(`/students/${studentId}/login`);

      setStudent(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      if (err.response) {
        Alert.alert('Validation fail', err.response.data.error);
      } else {
        Alert.alert('Error', 'Não foi possível verificar');
      }
    }
  }

  async function handleAccess() {
    if (!studentId || !token) return;

    setLoading(true);

    try {
      const { data } = await api.get(`/students/${studentId}/login/${token}`);

      await AsyncStorage.setItem('@GymPoint:student', JSON.stringify(data));

      navigation.navigate('CheckIn');
    } catch (err) {
      setLoading(false);

      if (err.response) {
        Alert.alert('Validation fail', err.response.data.error);
      } else {
        Alert.alert('Error', 'Não foi possível verificar');
      }
    }
  }

  function handleBack() {
    setStudent(null);
    setStudentId(null);
    setToken(null);
    setLoading(false);
  }

  return (
    <Container style={{ alignContent: 'center', justifyContent: 'center' }}>
      <Logo source={logo} />
      {student ? (
        <Form>
          <Name>
            <Strong>{student.name}</Strong>, enviamos um e-mail com o token para{' '}
            {student.email}.
          </Name>
          <Input
            keyboardType="number-pad"
            placeholder="Token"
            returnKeyType="send"
            onSubmitEditing={handleAccess}
            value={token}
            onChangeText={setToken}
          />
          <SubmitButton loading={loading} onPress={handleAccess}>
            Validar token
          </SubmitButton>
          <LinkButton onPress={handleBack}>
            <LinkText>Volte, não sou eu.</LinkText>
          </LinkButton>
        </Form>
      ) : (
        <Form>
          <Input
            keyboardType="number-pad"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={studentId}
            onChangeText={setStudentId}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      )}
    </Container>
  );
}
