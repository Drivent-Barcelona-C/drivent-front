import { useState, useEffect } from 'react';

import ContainerRooms from '../../../components/Hotel/Room';
import ResumeBooking from '../../../components/Hotel/ResumeBooking';
import StyledButton from '../../../components/Hotel/StyledButton';

import useHotel from '../../../hooks/api/useHotel';
import useBooking from '../../../hooks/api/useBooking';

export default function Hotel() {
  const [pickedHotel, setPickedHotel] = useState(1);
  const [bookingUser, setBookingUser] = useState({});
  const [statusBooking, setStatusBooking] = useState(false);
  const [changeRoom, setChangeRoom] = useState(false);
  const [hotels, setHotels] = useState([]);

  const { getHotel } = useHotel();
  const { getBooking } = useBooking();

  useEffect(() => {
    if (pickedHotel !== 0) {
      const promise = getHotel();
      promise
        .then((res) => setHotels(res));
    }
  }, [pickedHotel, changeRoom]);

  useEffect(() => {
    const promise = getBooking();
    promise
      .then((res) => {
        setBookingUser(res);
        setStatusBooking(true);
      });
  }, [changeRoom]);
  if (statusBooking) {
    return (
      <>
        {changeRoom ?
          <ContainerRooms rooms={hotels[0].Rooms}
            changeRoom={changeRoom}
            setChangeRoom={setChangeRoom}
            bookingUser={bookingUser} /> :
          <>
            {hotels.length !== 0 ? <ResumeBooking
              hotel={hotels[0]}
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
      {hotels.length !== 0 ? <ContainerRooms
        rooms={hotels[0].Rooms} /> : ''}
    </>
  );
}
