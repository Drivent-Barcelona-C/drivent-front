import styled from 'styled-components';

export default function HotelOptions({
  hotels,
  setPickedHotel,
}) {
  return (
    <>
      <ContainerHotels>
        <p>Primeiro, escolha seu hotel</p>
        <div className='boxHotels'>
          {hotels.map((hotel, index) => <>
            {
              <ShowHotel onClick={() => setPickedHotel(index)}>
                <img src={hotel.image} alt='Image Hotel.' />
                <h1>{hotel.name}</h1>
              </ShowHotel>
            }
          </>
          )}
        </div>
      </ContainerHotels>
    </>);
}

const ContainerHotels = styled.div`
  margin-top: 36px;
  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #8E8E8E;
    max-width: 812px;
  }
  .boxHotels{
    display: flex;
  }
`;

const ShowHotel = styled.div`
  width: 196px;
  height: 264px;
  background: #FFEED2;
  border-radius: 10px;
  margin-top: 14px;
  margin-right: 18px;
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
`;
