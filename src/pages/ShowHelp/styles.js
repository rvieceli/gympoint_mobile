import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Question = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  padding: 20px;
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

export const Description = styled.Text`
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

export const Space = styled.View`
  height: 20px;
`;
