import styled from 'styled-components';
import { useContext } from 'react';
import api from '../../services/api';
import useToken from '../../hooks/useToken';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import dayjs from 'dayjs';

dayjs.locale('pt-br');

export default function ActivitiesDay({ data }) {
  const token = useToken();
  const { setActivities } = useContext(ActivitiesContext);

  async function listActivities() {
    try {
      const response = await api.get('/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dayActivities = response.data.filter((res) => new Date(res.startHour).toLocaleDateString() === data.toLocaleDateString());
      return setActivities(dayActivities);
    } catch (error) {
      console.error(error);
      setActivities([]);
    }
  }

  return (
    <Day onClick={() => listActivities()}>{dayjs(data).format('ddd, DD/MM')}</Day>
  );
}

const Day = styled.button`
  background-color: #E0E0E0;
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

  &:hover {
    filter:brightness(0.8);
  }

  &:focus {
    background-color: #FFD37D;
    border-style: outset;
  }
`;

