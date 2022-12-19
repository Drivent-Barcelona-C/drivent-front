import styled from 'styled-components';
import { useState } from 'react';
import { Typography } from '@material-ui/core';

export default function ActivitiesBox({ activities }) {
  return (
    <Main>
      <LocationBox>
        <Location variant="h6">Auditório Principal</Location>
        <ActivitiesWrapper>
          {(activities.filter(data => data.location === 'AUDITORIO_PRINCIPAL')).map((value) => <>{value.name} <br/><br/></>)}
        </ActivitiesWrapper>
      </LocationBox>
      <LocationBox>
        <Location variant="h6">Auditório Lateral</Location>
        <ActivitiesWrapper>
          {(activities.filter(data => data.location === 'AUDITORIO_LATERAL')).map((value) => <>{value.name} <br/><br/></>)}
        </ActivitiesWrapper>
      </LocationBox>
      <LocationBox>
        <Location variant="h6">Sala de Workshop</Location>
        <ActivitiesWrapper>
          {(activities.filter(data => data.location === 'SALA_DE_WORKSHOP')).map((value) => <>{value.name} <br/><br/></>)}
        </ActivitiesWrapper>
      </LocationBox>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  height: 80%;
  background-color: green;
  justify-content: space-between;
`;

const LocationBox = styled.div`
  background-color: red;
  width: 33.33%;
`;

const Location = styled(Typography)`
  color: #7B7B7B;
  font-size: 17px !important;
  line-height: 20px;
  display: flex;
  justify-content: center;
`;

const ActivitiesWrapper = styled.div`
  height: 90%;
  border: 1px solid #D7D7D7;
`;
