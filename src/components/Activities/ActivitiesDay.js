import styled from 'styled-components';
import { useContext } from 'react';
import api from '../../services/api';
import useToken from '../../hooks/useToken';
import ActivitiesContext from '../../contexts/ActivitiesContext';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export default function ActivitiesDay({ date, activeDay, setActiveDay }) {
  const token = useToken();
  const { setActivities } = useContext(ActivitiesContext);

  async function listActivities() {
    try {
      const response = await api.get('/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dayActivities = response.data[date];
      setActiveDay(date);
      return setActivities(dayActivities);
    } catch (error) {
      console.error(error);
      setActivities([]);
    }
  }

  return (
    <Day
      onClick={() => listActivities()}
      activeDay={activeDay === date}
    >
      {dayjs(date).locale('pt-br').format('ddd, DD/MM')}
    </Day>
  );
}

const Day = styled.button`
  background-color: ${props => props.activeDay ? '#FFD37D' : '#E0E0E0'};
  border-style: ${props => props.activeDay ? 'none' : ''};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: #000000;
  width: 131px;
  height: 37px;
  font-size: 14px !important;
  line-height: 16px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  
  &:hover {
    ${props => props.activeDay ? 'none' : 'filter:brightness(0.8)'};
  }
`;
