import styled from 'styled-components/native';
import { FlatList } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  padding: 20px;
`;

export const List = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 15px;
  margin-bottom: 25px;
`;

export const Item = styled.TouchableOpacity`
  width: 100%;
  padding: 0 20px;

  margin: 5px 0;

  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;

  padding: 20px;
`;
export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.status ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Question = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;

  margin-top: 15px;
`;

export const Head = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Legend = styled(Icon).attrs(props => ({
  color: props.status ? '#42CB59' : '#999',
}))`
  margin-right: 15px;
`;
