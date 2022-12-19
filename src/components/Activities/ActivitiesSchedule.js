import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import { ActivitiesWrapper } from './ActivitiesWrapper';
import ActivitiesDay from './ActivitiesDay';
import ActivitiesBox from './ActivitiesBox';

export default function ActivitiesSchedule() {
  // const [ activities, setActivities ] = useState();

  const day = ['Sexta, 22/10', 'Sábado, 23/10', 'Domingo, 24/10'];

  const activities = [
    {
      id: 1,
      name: 'Minecraft: montando o PC ideal',
      startHour: new Date('2022-10-22T09:00:00'),
      endHour: new Date('2022-10-22T10:00:00'),
      location: 'AUDITORIO_PRINCIPAL',
      capacity: 30,
      ActivityBooking: []
    },
    {
      id: 2,
      name: 'LoL: montando o PC ideal',
      startHour: new Date('2022-10-22T10:00:00'),
      endHour: new Date('2022-10-22T11:00:00'),
      location: 'AUDITORIO_PRINCIPAL',
      capacity: 5,
      ActivityBooking: [1, 2, 3, 4, 5]
    },
    {
      id: 3,
      name: 'Palestra x',
      startHour: new Date('2022-10-22T09:00:00'),
      endHour: new Date('2022-10-22T11:00:00'),
      location: 'AUDITORIO_LATERAL',
      capacity: 30,
      ActivityBooking: [1, 2, 3]
    },
    {
      id: 4,
      name: 'Palestra y',
      startHour: new Date('2022-10-22T09:00:00'),
      endHour: new Date('2022-10-22T10:00:00'),
      location: 'SALA_DE_WORKSHOP',
      capacity: 15,
      ActivityBooking: []
    },
    {
      id: 5,
      name: 'Palestra z',
      startHour: new Date('2022-10-22T10:00:00'),
      endHour: new Date('2022-10-22T11:00:00'),
      location: 'SALA_DE_WORKSHOP',
      capacity: 5,
      ActivityBooking: [1, 2, 3, 4, 5]
    },
    {
      id: 6,
      name: 'essa é fake, outro dia',
      startHour: new Date('2022-10-23T10:00:00'),
      endHour: new Date('2022-10-23T11:00:00'),
      location: 'SALA_DE_WORKSHOP',
      capacity: 5,
      ActivityBooking: []
    },
  ];

  return (
    <ActivitiesWrapper>
      {activities.length === 0 && <Message variant="h5">Primeiro, filtre pelo dia do evento:</Message>}
      <DaysBox>
        {day ? day.map((data, index) => <ActivitiesDay key={index} data={data}/>) : 'sem dias ainda'}
      </DaysBox>
      {activities.length !== 0 && <ActivitiesBox activities={activities}/>}
    </ActivitiesWrapper>
  );
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
