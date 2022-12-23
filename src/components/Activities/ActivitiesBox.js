import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import ShowActivity from './ShowActivity';

export default function ActivitiesBox({ activities }) {
  return (
    <Main>
      <LocationBox>
        <Location variant="h6">Auditório Principal</Location>
        <ActivitiesWrapper>
          {(activities.filter(data => data.location === 'AUDITORIO_PRINCIPAL')).map((value) => <ShowActivity key={value.id} activity={value} />)}
        </ActivitiesWrapper>
      </LocationBox>
      <LocationBox>
        <Location variant="h6">Auditório Lateral</Location>
        <ActivitiesWrapper>
          {(activities.filter(data => data.location === 'AUDITORIO_LATERAL')).map((value) => <ShowActivity key={value.id} activity={value} />)}
        </ActivitiesWrapper>
      </LocationBox>
      <LocationBox>
        <Location variant="h6">Sala de Workshop</Location>
        <ActivitiesWrapper>
          {(activities.filter(data => data.location === 'SALA_DE_WORKSHOP')).map((value) => <ShowActivity key={value.id} activity={value} />)}
        </ActivitiesWrapper>
      </LocationBox>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LocationBox = styled.div`
  width: 33.33%;
`;

const Location = styled(Typography)`
  color: #7B7B7B;
  font-size: 17px !important;
  font-weight: 400 !important;
  margin-bottom: 13px !important;
  display: flex;
  justify-content: center;
`;

const ActivitiesWrapper = styled.div`
  min-height: 100%;
  padding: 10px;
  border: 1px solid #D7D7D7;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &::-webkit-scrollbar { 
	  display: none;
  }
`;
