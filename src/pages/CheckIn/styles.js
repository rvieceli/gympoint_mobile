import styled from 'styled-components/native';
import { FlatList } from 'react-navigation';

export const Container = styled.View`
  padding: 20px;
`;

export const List = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 15px;
`;

export const Item = styled.View`
  width: 100%;
  height: 46px;
  padding: 0 20px;

  margin: 5px 0;

  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;
