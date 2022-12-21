import { useState } from 'react';
import styled from 'styled-components';

export default function HotelOption({
  name,
  image,
  hotelId,
  color,
  selected,
  setSelected,
  multiple = false,
  rooms,
  vacancies,
  avaiable,
}) {
  function toggle(id) {
    let index = selected.findIndex((i) => i === id);
    let hotelsSelecteds = [...selected];
    if (index !== -1) {
      hotelsSelecteds.splice(index, 1);
    } else {
      multiple ? hotelsSelecteds.push(id) : (hotelsSelecteds = [hotelId]);
    }
    setSelected(hotelsSelecteds);
    console.log(rooms);
  }

  let filteredType = avaiable.filter((type) => type !== false);

  return (
    <Hotels
      background={selected.findIndex((i) => i === hotelId) !== -1 ? (color = '#FFEED2') : (color = '#EBEBEB')}
      onClick={() => toggle(hotelId)}
    >
      <img src={image} />
      <p>{name}</p>

      <Accommodation>Tipos de acomodação:</Accommodation>
      <AccommodationType>
        <p>{filteredType.join(', ')}</p>
      </AccommodationType>
      <Vacancies>Vagas Disponiveis:</Vacancies>
      <AvaiableRooms>{vacancies}</AvaiableRooms>
    </Hotels>
  );
}

const Hotels = styled.div`
  background-color: ${(props) => props.background};
  width: 196px;
  height: 264px;
  border-radius: 8px;
  margin-top: 15px;
  margin-right: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  img {
    margin: 10px 0;
    height: 40%;
    width: 92%;
    border-radius: 4px;
  }
  p {
    color: #343434;
    font-size: 20px;
  }
`;

const Accommodation = styled.div`
  font-size: 10px;
  margin-top: 15px;
  font-weight: bold;
`;

const Vacancies = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-top: 15px;
`;

const AccommodationType = styled.div`
  display: flex;
  margin-top: 5px;
  p {
    font-size: 10px;
  }
`;

const AvaiableRooms = styled.div`
  font-size: 10px;
  margin-top: 5px;
`;
