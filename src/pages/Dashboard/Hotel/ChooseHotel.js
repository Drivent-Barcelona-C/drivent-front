import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContainerRooms from '../../../components/Hotel/Room';
import ResumeBooking from '../../../components/Hotel/ResumeBooking';
import StyledButton from '../../../components/Hotel/StyledButton';
import HotelOption from './HotelOption';
import useHotel from '../../../hooks/api/useHotel';
import useBooking from '../../../hooks/api/useBooking';

export default function ChooseHotel() {
  const [pickedHotel, setPickedHotel] = useState(-1);
  const [bookingUser, setBookingUser] = useState({});
  const [statusBooking, setStatusBooking] = useState(false);
  const [changeRoom, setChangeRoom] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [selected, setSelected] = useState([]);
  let [color, setColor] = useState('#EBEBEB');

  const { getHotel } = useHotel();
  const { getBooking } = useBooking();

  useEffect(() => {
    const promise = getHotel();
    promise.then((res) => setHotels(res));
  }, [changeRoom]);

  useEffect(() => {
    const promise = getBooking();
    promise.then((res) => {
      setBookingUser(res);
      setStatusBooking(true);
    });
  }, [changeRoom]);

  if (statusBooking) {
    let hotelId = 0;
    hotels.map((hotel, index) => {
      if (hotel.id === bookingUser.Room.hotelId) {
        hotelId = index;
      }
    });
    return (
      <>
        {changeRoom ? (
          <ContainerRooms
            rooms={hotels[hotelId].Rooms}
            changeRoom={changeRoom}
            setChangeRoom={setChangeRoom}
            bookingUser={bookingUser}
          />
        ) : (
          <>
            {hotels.length !== 0 ? <ResumeBooking hotel={hotels[hotelId]} bookingUser={bookingUser} /> : ''}
            <StyledButton onClick={() => setChangeRoom(true)}>TROCAR QUARTO</StyledButton>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {hotels.length !== 0 ? (
        <>
          {pickedHotel < 0 ? (
            <IncludesHotel>
              <Title>Primeiro, escolha seu hotel</Title>
              <ContainerHotels>
                {hotels.map((hotel, index) => (
                  <HotelOption
                    name={hotel.name}
                    image={hotel.image}
                    hotelId={hotel.id}
                    key={index}
                    index={index}
                    color={color}
                    selected={selected}
                    setSelected={setSelected}
                    rooms={hotel.Rooms}
                    vacancies={hotel.vacancies}
                    avaiable={hotel.types}
                    setPickedHotel={setPickedHotel}
                  />
                ))}
              </ContainerHotels>
            </IncludesHotel>
          ) : (
            <ContainerRooms rooms={hotels[pickedHotel].Rooms} />
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
}

const IncludesHotel = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
`;

const Title = styled.div`
  color: #8e8e8e;
  font-size: 15px;
  margin-top: 20px;
`;

const ContainerHotels = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 90%;
  p {
    color: #8e8e8e;
    font-size: 20px;
  }
`;
