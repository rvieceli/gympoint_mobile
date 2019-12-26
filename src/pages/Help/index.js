import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Background from '../../components/Background';
import Button from '../../components/Button';
import Exit from '../../components/Exit';

import { formatDistanceDateToNow } from '../../utils/format';
import api from '../../services/api';

import {
  Container,
  List,
  Item,
  Time,
  Title,
  Question,
  Head,
  Status,
  Legend,
} from './styles';

function Help({ navigation, isFocused }) {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [helps, setHelps] = useState([]);
  const [page, setPage] = useState(1);

  async function startUp() {
    setLoading(!refreshing);
    const { data } = await api.get(`/students/${student.id}/help-orders`, {
      params: { page: 1, pageSize: 10 },
    });

    const rows = data.rows.map(checkIn => ({
      ...checkIn,
      createdAtFormatted: formatDistanceDateToNow(checkIn.createdAt),
      updatedAtFormatted: formatDistanceDateToNow(checkIn.updatedAt),
    }));

    const hasMore = data.page <= data.pages;

    setHelps(rows);
    setPage(hasMore ? 2 : null);
    setLoading(false);
  }

  async function loadMode() {
    if (!student) return;
    if (!page) return;
    if (loading) return;

    setLoading(true);

    const { data } = await api.get(`/students/${student.id}/help-orders`, {
      params: { page, pageSize: 10 },
    });

    const rows = data.rows.map(checkIn => ({
      ...checkIn,
      createdAtFormatted: formatDistanceDateToNow(checkIn.createdAt),
      updatedAtFormatted: formatDistanceDateToNow(checkIn.updatedAt),
    }));

    const hasMore = data.page <= data.pages;

    setHelps([...helps, ...rows]);
    setPage(hasMore ? page + 1 : null);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);
    await startUp();
    setRefreshing(false);
  }

  useEffect(() => {
    AsyncStorage.getItem('@GymPoint:student').then(value => {
      setStudent(JSON.parse(value));
    });
  }, []);

  useEffect(() => {
    if (isFocused && student) {
      startUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, student]);

  function renderFooter() {
    if (!loading || refreshing) return null;
    return <ActivityIndicator size="small" />;
  }

  function handleShow(question) {
    navigation.navigate('ShowHelp', { question });
  }

  return (
    <Background>
      <Container>
        <Button onPress={() => navigation.navigate('NewHelp', { student })}>
          Novo pedido de auxílio
        </Button>

        <List
          data={helps}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Item onPress={() => handleShow(item)}>
              <Head>
                <Status>
                  <Legend
                    name="check-circle"
                    size={16}
                    status={!!item.answer}
                  />
                  <Title status={!!item.answer}>
                    {item.answer ? 'Respondido' : 'Sem resposta'}
                  </Title>
                </Status>
                <Time>{item.createdAtFormatted}</Time>
              </Head>
              <Question numberOfLines={3}>{item.question}</Question>
            </Item>
          )}
          onEndReached={loadMode}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          onRefresh={refreshList}
          refreshing={refreshing}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </Container>
    </Background>
  );
}

Help.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Help.navigationOptions = props => ({
  headerRight: <Exit {...props} />,
});

export default withNavigationFocus(Help);
