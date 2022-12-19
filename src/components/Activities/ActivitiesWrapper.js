import styled from 'styled-components';

export const ActivitiesWrapper = styled.div`
background-color: purple;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
