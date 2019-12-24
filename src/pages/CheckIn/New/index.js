import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../../services/api';
import Button from '../../../components/Button';

export default function New({ student, onCheckIn }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckIn() {
    if (!student) return;

    setLoading(true);
    try {
      const { data } = await api.post(`/students/${student.id}/checkins`);

      setLoading(false);
      if (onCheckIn) onCheckIn(data);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        Alert.alert(err.response.data.error);
      } else {
        Alert.alert('Não foi possível fazer Check-in');
      }
    }
  }

  return (
    <Button loading={loading} onPress={handleCheckIn}>
      Novo check-in
    </Button>
  );
}

New.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
  }),
  onCheckIn: PropTypes.func,
};

New.defaultProps = {
  student: null,
  onCheckIn: null,
};
