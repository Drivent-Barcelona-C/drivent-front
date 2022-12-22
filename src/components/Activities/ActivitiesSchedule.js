import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';

import { ActivitiesWrapper } from './ActivitiesWrapper';
import ActivitiesDay from './ActivitiesDay';
import ActivitiesBox from './ActivitiesBox';
import ActivitiesContext from '../../contexts/ActivitiesContext';

import api from '../../services/api';
import useToken from '../../hooks/useToken';

export default function ActivitiesSchedule() {
  const token = useToken();
  const { activities } = useContext(ActivitiesContext);
  const [activitiesDays, setActivitiesDays] = useState([]);

  async function listActivitiesDays() {
    try {
      const response = await api.get('/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const eventDays = Object.keys(response.data);
      return setActivitiesDays(eventDays);
    } catch (error) {
      console.error(error);
      setActivitiesDays([]);
    }
  }

  useEffect(() => listActivitiesDays(), []);

  if (activitiesDays.length === 0) {
    return (
      <ActivitiesWrapper>
        <Message variant="h5">Ainda não existem atividades registradas para este evento!</Message>
      </ActivitiesWrapper>
    );
  } else {
    return (
      <ActivitiesWrapper>
        {activities === null && <Message variant="h5">Primeiro, filtre pelo dia do evento:</Message>}
        <DaysBox>
          {activitiesDays && activitiesDays.map((data, index) => <ActivitiesDay key={index} date={data} />)}
        </DaysBox>
        {activities !== null && <ActivitiesBox activities={activities} />}
      </ActivitiesWrapper>
    );
  }
}

const Message = styled(Typography)`
  color: #8E8E8E;
  font-size: 20px !important;
  line-height: 23px !important;
  margin-bottom: 23px !important;
  display: flex;
  text-align: center;
`;

const DaysBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  margin-bottom: 61px;

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
