import styled from 'styled-components';

export const ActivitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
