import styled from 'styled-components';

export default styled.div`
  height: 100px;
  max-height: ${(props) => props.height || '300px'};

  width: 290px;
  max-width: ${(props) => props.width || '290px'};

  border-radius: 20px;
  background-color: ${(props) => props.background || '#FFEED2'};

  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  color: ${(props) => props.color || '#454545'};
  div:first-child {
    margin-bottom: 10px;
  }
  div:last-child {
    color: #898989;
  }

  @media (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
    height: auto;
    max-height: initial;
    min-width: 100%;
    max-width: initial;
  }
`;
