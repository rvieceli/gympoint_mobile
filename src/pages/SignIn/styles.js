import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #fff;

  justify-content: center;
  align-items: center;

  padding: 0 25px;
`;

export const Logo = styled.Image``;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 45px;
  padding: 0 20px;

  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const ErrorMessage = styled.Text`
  color: #ee4e62;
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  align-self: center;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
