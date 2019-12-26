import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Background from '../../components/Background';
import Exit from '../../components/Exit';

import { Container, List, Item, Title, Time } from './styles';
import New from './New';

import { formatDistanceDateToNow } from '../../utils/format';
import api from '../../services/api';

function CheckIn({ isFocused }) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [student, setStudent] = useState();
  const [checkIns, setCheckIns] = useState([]);
  const [page, setPage] = useState(1);

  async function startUp() {
    setLoading(!refreshing);

    const { data } = await api.get(`/students/${student.id}/checkins`, {
      params: { page: 1, pageSize: 10 },
    });

    const rows = data.rows.map(checkIn => ({
      ...checkIn,
      createdAtFormatted: formatDistanceDateToNow(checkIn.createdAt),
    }));

    const hasMore = data.page <= data.pages;

    setCheckIns(rows);
    setPage(hasMore ? 2 : null);
    setLoading(false);
  }

  async function loadMore() {
    if (!student) return;
    if (!page) return;
    if (loading) return;

    setLoading(true);
    const { data } = await api.get(`/students/${student.id}/checkins`, {
      params: { page, pageSize: 10 },
    });

    const rows = data.rows.map(checkIn => ({
      ...checkIn,
      createdAtFormatted: formatDistanceDateToNow(checkIn.createdAt),
    }));

    const hasMore = data.page <= data.pages;

    setCheckIns([...checkIns, ...rows]);
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

  function handleCheckIn({ checkIn }) {
    const row = {
      ...checkIn,
      createdAtFormatted: formatDistanceDateToNow(checkIn.createdAt),
    };
    setCheckIns([row, ...checkIns]);
  }

  function renderFooter() {
    if (!loading || refreshing) return null;

    return <ActivityIndicator size="small" />;
  }

  return (
    <Background>
      <Container>
        <New student={student} onCheckIn={handleCheckIn} />

        <List
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Item>
              <Title>Check-in #{String(item.id)}</Title>
              <Time>{item.createdAtFormatted}</Time>
            </Item>
          )}
          onEndReached={loadMore}
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

CheckIn.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

CheckIn.navigationOptions = props => ({
  headerRight: <Exit {...props} />,
});

export default withNavigationFocus(CheckIn);
