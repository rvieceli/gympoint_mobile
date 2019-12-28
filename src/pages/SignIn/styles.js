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

  font-size: ${props => (props.value ? 20 : 16)};
  color: #444;
  font-weight: ${props => (props.value ? 'bold' : 'normal')};
  text-align: center;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const Strong = styled.Text`
  font-weight: bold;
`;

export const Name = styled.Text`
  color: #ee4e62;
  font-size: 15px;
  margin-bottom: 10px;
  align-self: center;
`;

export const LinkButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const LinkText = styled.Text`
  color: #ee4e62;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
`;
