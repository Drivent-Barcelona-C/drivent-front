import styled from 'styled-components';

export default function HotelOption({
  name,
  image,
  hotelId,
  selected,
  setSelected,
  multiple = false,
  rooms,
  vacancies,
  avaiable,
  setPickedHotel,
  index,
}) {
  function toggle(id) {
    let myIndex = selected.findIndex((i) => i === id);
    let hotelsSelecteds = [...selected];
    if (myIndex !== -1) {
      hotelsSelecteds.splice(myIndex, 1);
    } else {
      multiple ? hotelsSelecteds.push(id) : (hotelsSelecteds = [hotelId]);
    }
    setSelected(hotelsSelecteds);
    setPickedHotel(index);
  }
  let filteredType = avaiable.filter((type) => type !== false);

  return (
    <Hotels
      background={selected.findIndex((i) => i === hotelId) !== -1 ? '#FFEED2' : '#EBEBEB'}
      onClick={() => toggle(hotelId)}
    >
      <img src={image} aria-hidden alt="Image Hotel." />
      <Title>{name}</Title>

      <Accommodation>Tipos de acomodação:</Accommodation>
      <AccommodationType>
        <Subtitle>{filteredType.join(', ')}</Subtitle>
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
`;

const Title = styled.div`
  font-size: 20px;
  color: #343434;
  font-weight: 400;
`;

const Subtitle = styled.div`
  font-size: 12px;
  color: #3c3c3c;
`;

const Accommodation = styled.div`
  font-size: 12px;
  margin-top: 15px;
  font-weight: 700;
`;

const Vacancies = styled.div`
  font-size: 12px;
  font-weight: 700;
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
