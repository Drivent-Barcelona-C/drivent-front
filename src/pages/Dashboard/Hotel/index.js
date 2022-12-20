import { useState } from 'react';
import { useEffect } from 'react';
import ContainerRooms from '../../../components/Hotel/Room';

import useHotel from '../../../hooks/api/useHotel';

export default function Hotel() {
  const [pickedHotel, setPickedUser] = useState(0);

  const [hotels, setHotels] = useState([]);

  const { getHotel } = useHotel();

  useEffect(() => {
    const promise = getHotel();
    promise
      .then((res) => setHotels(res));
  }, [pickedHotel]);

  return (
    <>
      {hotels.length !== 0 ? <ContainerRooms rooms={hotels[0].Rooms} /> : ''}
    </>
  );
}
