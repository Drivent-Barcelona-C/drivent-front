import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import Button from '../Form/Button';
import useBooking from '../../hooks/api/useBooking';

function ShowVacancies({ vacancies, filled, picked }) {
  const view = [];
  if (picked) {
    filled++;
  }
  for (let i = 1; i <= vacancies; i++) {
    if (i > filled) {
      view.unshift(true);
      continue;
    }
    view.unshift(false);
  }

  if (picked) {
    return (
      <>
        {view.map((e, index) => e ?
          <BsPerson key={index} /> :
          <BsFillPersonFill className='picked' key={index} />)}
      </>
    );
  }
  return (
    <>
      {view.map((e, index) => e ?
        <BsPerson key={index} /> :
        <BsFillPersonFill key={index} />)}
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
          picked={room.id === pickedUser ? true : false} /></span>
      </StyledRooms>
    </>
  );
}

export default function ContainerRooms({ rooms }) {
  const [pickedUser, setPickedUser] = useState(0);
  const [reserve, setReserve] = useState(false);
  const navigate = useNavigate();

  const { postBooking } = useBooking();
  useEffect(() => {
    if (pickedUser !== 0) {
      const promise = postBooking({ roomId: pickedUser });
      promise
        .then((res) => {
          toast('Quarto reservado com sucesso!');
          setPickedUser(0);
          navigate('/dashboard');
        })
        .catch(() => {
          toast('Não foi possivel reservar quarto!');
          setPickedUser(0);
        });
    }
  }, [reserve]);

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
          {pickedUser > 0 ?
            <StyledButton onClick={() => setReserve(!reserve)}>
              RESERVAR QUARTO
            </StyledButton>
            : ''}
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

const StyledButton = styled(Button)`
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #000000;
  margin-top: 46px !important;
`;
