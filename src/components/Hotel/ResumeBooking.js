import styled from 'styled-components';

export default function ResumeBooking({
  hotel,
  bookingUser,
}) {
  let personRoom = 1;
  hotel.Rooms.map(room => {
    room.Booking.map(b => {
      if (b.id === bookingUser.id) {
        personRoom = room.Booking.length;
      }
    });
  });
  function typeRoom(capacity) {
    /* eslint-disable*/
    switch (capacity) {
      case 1:
        return 'Single';
      case 2:
        return 'Double';
      default:
        return 'Triple';
    }
    /* eslint-enable*/
  }
  return (
    <ContainerResume>
      <p>Você já escolheu seu quarto:</p>
      <ShowResume>
        <img src={hotel.image} alt='Image Hotel.' />
        <h1>{hotel.name}</h1>
        <h2>Quarto reservado</h2>
        <h3>{bookingUser.Room.name} ({typeRoom(bookingUser.Room.capacity)})</h3>
        <h2>Pessoas no seu quarto</h2>
        {personRoom === 1 ? <h3>Somente você</h3> : <h3>Você e mais {personRoom - 1} </h3>}
      </ShowResume>
    </ContainerResume>);
}

const ContainerResume = styled.div`
  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #8E8E8E;
    max-width: 812px;
  }
`;

const ShowResume = styled.div`
  width: 196px;
  height: 264px;
  background: #FFEED2;
  border-radius: 10px;
  margin-top: 14px;
  img{
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin: 16px 14px 0 14px;
  }
  h1{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;
    color: #343434;
    margin: 10px 14px;
  }
  h2{
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
    margin: 0 14px;
  }
  h3{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
    margin: 2px 14px 14px 14px;
  }
`;
