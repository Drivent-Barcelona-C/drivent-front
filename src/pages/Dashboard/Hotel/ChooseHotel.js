import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HotelOption from './HotelOption';
import { getHotels } from '../../../services/hotelsApi';
import { getTokenStoraged } from '../../../hooks/useToken';

export default function chooseHotel({ TicketType }) {
  const [hotels, setHotels] = useState([]);
  let [color, setColor] = useState('#EBEBEB');
  const token = getTokenStoraged();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getHotels(token).then((res) => {
      console.log(res);
      setHotels(res);
    });
  }, []);

  return (
    <Container>
      {TicketType.includesHotel === true ? (
        <IncludesHotel>
          <p>Primeiro, escolha seu hotel</p>
          <ContainerHotels>
            {hotels.map((hotel, index) => (
              <HotelOption
                name={hotel.name}
                image={hotel.image}
                hotelId={hotel.id}
                key={index}
                color={color}
                selected={selected}
                setSelected={setSelected}
                rooms={hotel.Rooms}
                vacancies={hotel.vacancies}
                avaiable={hotel.types}
              />
            ))}
          </ContainerHotels>
        </IncludesHotel>
      ) : (
        <NoIncludesHotel>
          Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades
        </NoIncludesHotel>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IncludesHotel = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  p {
    color: #8e8e8e;
    font-size: 20px;
  }
`;

const ContainerHotels = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NoIncludesHotel = styled.div`
  text-align: center;
  font-size: 20px;
  width: 60%;
  color: #8e8e8e;
`;
