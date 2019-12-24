import React, { useState } from 'react';

import { Alert } from 'react-native';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { Container, Input } from './styles';

import api from '../../services/api';

export default function NewHelp({ navigation }) {
  const { id } = navigation.getParam('student');
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (loading) return;

    setLoading(true);

    try {
      await api.post(`/students/${id}/help-orders`, {
        question,
      });

      navigation.goBack();
    } catch (err) {
      if (err.response) {
        Alert.alert(err.response.data.error);
      } else {
        Alert.alert('Não foi possível pedir ajudar agora.');
      }
    }
  }

  return (
    <Background>
      <Container>
        <Input
          placeholder="Descreva seu pedido de auxílio"
          multiline
          underlineColorAndroid="transparent"
          numberOfLines={10}
          value={question}
          onChangeText={setQuestion}
        />
        <Button onPress={handleSubmit}>Enviar pedido</Button>
      </Container>
    </Background>
  );
}
