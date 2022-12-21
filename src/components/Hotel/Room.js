import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';

import StyledButton from './StyledButton';

import useCreateBooking from '../../hooks/api/useCreateBooking';
import useChangeBooking from '../../hooks/api/useChangeBooking';

function ShowVacancies({ vacancies, filled, picked = '' }) {
  const view = [];
  if (picked === 'picked') {
    filled++;
  }
  for (let i = 1; i <= vacancies; i++) {
    if (i > filled) {
      view.unshift({ occupied: true, class: '' });
      continue;
    }
    view.push({ occupied: false, class: picked });
    picked = '';
  }
  return (
    <>
      {view.map((e, index) => e.occupied ?
        <BsPerson key={index} /> :
        <BsFillPersonFill className={e.class} key={index} />)}
    </>
  );
}

function Rooms({ room, filled, pickedUser, setPickedUser }) {
  if (filled === room.capacity) {
    return (
      <>
        <StyledRooms className='roomFull'>
          {room.name}
          <span>
            <ShowVacancies vacancies={room.capacity} filled={filled} />
          </span>
        </StyledRooms>
      </>
    );
  }
  return (
    <>
      <StyledRooms className={pickedUser === room.id ? 'roomPicked' : 'roomFree'}
        onClick={() => {
          room.id === pickedUser ?
            setPickedUser(0) : setPickedUser(room.id);
        }} key={room.id}>
        {room.name} <span><ShowVacancies vacancies={room.capacity}
          filled={filled}
          picked={room.id === pickedUser ? 'picked' : ''} /></span>
      </StyledRooms>
    </>
  );
}

export default function ContainerRooms({
  rooms,
  changeRoom = false,
  setChangeRoom,
  bookingUser,
}) {
  const [pickedUser, setPickedUser] = useState(0);
  const [reserve, setReserve] = useState(false);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  const { postBooking } = useCreateBooking();
  useEffect(() => {
    if (pickedUser !== 0 && reserve) {
      const promise = postBooking({ roomId: pickedUser });
      promise
        .then((res) => {
          toast('Quarto reservado com sucesso!');
          setPickedUser(0);
          window.location.assign('/dashboard/hotel');
        })
        .catch(() => {
          toast('Não foi possivel reservar quarto!');
          setPickedUser(0);
        });
    }
  }, [reserve]);
  const { putBooking } = useChangeBooking();
  useEffect(() => {
    if (pickedUser !== 0 && change) {
      const promise = putBooking({
        bookingId: bookingUser.id,
        roomId: pickedUser
      });
      promise
        .then((res) => {
          toast('Quarto reservado com sucesso!');
          setPickedUser(0);
          navigate('/dashboard/hotel');
          setChangeRoom(false);
        })
        .catch(() => {
          toast('Não foi possivel reservar quarto!');
          setPickedUser(0);
        });
    }
  }, [change]);

  return (
    <StyledContainerRooms >
      {rooms.length > 0 ?
        <>
          <p>Ótima pedida! Agora escolha seu quarto</p>
          <div className='containerRooms'>
            {rooms.map((room, index) =>
              <Rooms key={index}
                room={room}
                filled={room.Booking.length}
                pickedUser={pickedUser}
                setPickedUser={setPickedUser} />)}
          </div>
          {changeRoom ?
            <>
              {pickedUser > 0 ?
                <StyledButton onClick={() => {
                  setChange(true);
                }}>
                  RESERVAR QUARTO
                </StyledButton>
                : ''}
            </> :
            <>
              {pickedUser > 0 ?
                <StyledButton onClick={() => {
                  setReserve(true);
                }}>
                  RESERVAR QUARTO
                </StyledButton>
                : ''}
            </>
          }
        </>
        : ''}
    </StyledContainerRooms>
  );
}

const StyledContainerRooms = styled.div`
  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #8E8E8E;
    max-width: 812px;
  }
  .containerRooms{
    max-width: 812px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .roomFull{
    background-color: #CECECE;
    color: #8C8C8C;
  }
  .roomFree{
    cursor: pointer;
  }
  .roomPicked{
    cursor: pointer;
    background-color:#FFEED2;
  }
  .picked{
    color: #FF4791;
  }
  margin-top: 36px;
`;

const StyledRooms = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  margin-top: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #454545;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-right: 12px;
`;
