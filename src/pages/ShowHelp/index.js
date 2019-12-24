import React from 'react';

import Background from '../../components/Background';
import {
  Container,
  Question,
  Head,
  Title,
  Time,
  Description,
  Space,
} from './styles';

export default function ShowHelp({ navigation }) {
  const question = navigation.getParam('question');

  return (
    <Background>
      <Container>
        <Question>
          <Head>
            <Title>PERGUNTA</Title>
            <Time>{question.createdAtFormatted}</Time>
          </Head>
          <Description>{question.question}</Description>

          {question.answer && (
            <>
              <Space />
              <Head>
                <Title>RESPOSTA</Title>
                <Time>{question.updatedAtFormatted}</Time>
              </Head>
              <Description>{question.answer}</Description>
            </>
          )}
        </Question>
      </Container>
    </Background>
  );
}
