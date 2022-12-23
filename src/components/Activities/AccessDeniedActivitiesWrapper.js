import styled from 'styled-components';

export const AccessDeniedActivitiesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  flex-wrap: wrap;
  
  > div {
    width: calc(50% - 20px);
    margin: 0 10px 0 0;
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
