import styled from 'styled-components';
import { useState } from 'react';

export default function ActivitiesDay({ data }) {
  const [ selected, setSelected ] = useState(false);

  function selectDay() {
    setSelected(!selected);
    if (selected) {
      //get activities daquele dia
      return;
    } else {
      //setActivities em branco
    }
    setSelected(!selected);
  }

  return (
    <Day selected={selected} onClick={() => selectDay()}>{data}</Day>
  );
}

const Day = styled.div`
  background-color: ${props => props.selected ? '#FFD37D' : '#E0E0E0'};
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
`;

