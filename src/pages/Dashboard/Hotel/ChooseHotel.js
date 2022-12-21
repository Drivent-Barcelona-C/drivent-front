import { useState, useEffect } from 'react';

import HotelOptions from '../../../components/Hotel/HotelOptions';
import ContainerRooms from '../../../components/Hotel/Room';
import ResumeBooking from '../../../components/Hotel/ResumeBooking';
import StyledButton from '../../../components/Hotel/StyledButton';

import useHotel from '../../../hooks/api/useHotel';
import useBooking from '../../../hooks/api/useBooking';

export default function ChooseHotel() {
  const [pickedHotel, setPickedHotel] = useState(-1);
  const [bookingUser, setBookingUser] = useState({});
  const [statusBooking, setStatusBooking] = useState(false);
  const [changeRoom, setChangeRoom] = useState(false);
  const [hotels, setHotels] = useState([]);

  const { getHotel } = useHotel();
  const { getBooking } = useBooking();

  useEffect(() => {
    const promise = getHotel();
    promise
      .then((res) => setHotels(res));
  }, [changeRoom]);

  useEffect(() => {
    const promise = getBooking();
    promise
      .then((res) => {
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
        {changeRoom ?
          <ContainerRooms rooms={hotels[hotelId].Rooms}
            changeRoom={changeRoom}
            setChangeRoom={setChangeRoom}
            bookingUser={bookingUser} /> :
          <>
            {hotels.length !== 0 ? <ResumeBooking
              hotel={hotels[hotelId]}
              bookingUser={bookingUser} /> : ''}
            <StyledButton onClick={() => setChangeRoom(true)}>
              TROCAR QUARTO
            </StyledButton>
          </>}
      </>
    );
  }

  return (
    <>
      {hotels.length !== 0 ?
        <>
          {pickedHotel < 0 ?
            <HotelOptions
              hotels={hotels}
              setPickedHotel={setPickedHotel} /> :
            <ContainerRooms
              rooms={hotels[pickedHotel].Rooms} />}
        </> : ''}
    </>
  );
}
