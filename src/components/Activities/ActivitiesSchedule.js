import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { ActivitiesWrapper } from './ActivitiesWrapper';
import ActivitiesDay from './ActivitiesDay';
import ActivitiesBox from './ActivitiesBox';
import ActivitiesContext from '../../contexts/ActivitiesContext';
import EventInfoContext from '../../contexts/EventInfoContext';

export default function ActivitiesSchedule() {
  const { activities } = useContext(ActivitiesContext);
  const { eventInfo } = useContext(EventInfoContext);
  const [ eventDays, setEventDays ] = useState([]);

  function getDaysArray(startDate, endDate) {
    const dates = [];
  
    while (startDate <= endDate) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {
    setEventDays(getDaysArray(new Date(eventInfo.startsAt), new Date(eventInfo.endsAt)));
  }, [eventInfo]);

  return (
    <ActivitiesWrapper>
      {activities === null && <Message variant="h5">Primeiro, filtre pelo dia do evento:</Message>}
      <DaysBox>
        {eventDays && eventDays.map((data, index) => <ActivitiesDay key={index} data={data}/>)}
      </DaysBox>
      {activities !== null && <ActivitiesBox activities={activities}/>}
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
