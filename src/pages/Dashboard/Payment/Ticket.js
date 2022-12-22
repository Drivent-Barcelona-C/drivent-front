import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useProcessReservation from '../../../hooks/api/useProcessReservation';
import { toast } from 'react-toastify';

export default function Ticket({ ticketType, ticketTypeFinish, setStatus }) {
  const [ticketTypes, setTicketTypes] = useState(null);
  const [withHotel, setWithHotel] = useState(null);
  const { postReservation, reservationLoading } = useProcessReservation();

  const [online, setOnline] = useState([]);
  const [presencialSemHotel, setPresencialSemHotel] = useState([]);
  const [presencialComHotel, setPresencialComHotel] = useState([]);

  useEffect(() => {
    if (ticketType) {
      setOnline(ticketType.filter((a) => a.isRemote === true));
      setPresencialSemHotel(ticketType.filter((a) => a.isRemote === false && a.includesHotel === false));
      setPresencialComHotel(ticketType.filter((a) => a.isRemote === false && a.includesHotel === true));
    }
  }, [ticketTypeFinish, ticketType]);

  function getPresentialTicket() {
    if (ticketTypes === false) {
      setTicketTypes(true);
    } else if (ticketTypes !== null) {
      setTicketTypes(null);
    } else {
      setTicketTypes(true);
    }
  }

  function getOnlineTicket() {
    if (ticketTypes === true) {
      setTicketTypes(false);
      setWithHotel(null);
    } else if (ticketTypes !== null) {
      setTicketTypes(null);
      setWithHotel(null);
    } else {
      setTicketTypes(false);
      setWithHotel(null);
    }
  }

  function wantHotel() {
    if (withHotel === false) {
      setWithHotel(true);
    } else if (withHotel !== null) {
      setWithHotel(null);
    } else {
      setWithHotel(true);
    }
  }

  function doesntWantHotel() {
    if (withHotel === true) {
      setWithHotel(false);
    } else if (withHotel !== null) {
      setWithHotel(null);
    } else {
      setWithHotel(false);
    }
  }

  async function confirmTicket() {
    try {
      if (ticketTypes === true && withHotel === true) {
        await postReservation({ ticketTypeId: presencialComHotel[0].id });
      } else if (ticketTypes === true && withHotel === false) {
        await postReservation({ ticketTypeId: presencialSemHotel[0].id });
      } else if (ticketTypes === false) {
        await postReservation({ ticketTypeId: online[0].id });
      }
      window.location.assign('/dashboard/payment');
      toast('Ticket reservado com sucesso!');
    } catch (error) {
      toast('Não foi possivel realizar a reserva.');
    }
  }

  return (
    <>
      {!ticketTypeFinish ? (
        ''
      ) : (
        <PaymentPage>
          <h2>Primeiro, escolha sua modalidade de ingresso</h2>

          <div className="TicketTypes">
            <TicketPresential onClick={getPresentialTicket} clicked={ticketTypes}>
              <h3>Presencial</h3>
              <h4>R$ {ticketType === null ? '' : presencialSemHotel[0].price}</h4>
            </TicketPresential>
            <TicketOnline onClick={getOnlineTicket} clicked={ticketTypes}>
              <h3>Online</h3>
              <h4>R$ {ticketType === null ? '' : online[0].price}</h4>
            </TicketOnline>
          </div>

          {ticketTypes === true ? (
            <PresentialTicketTypes>
              <h4>Ótimo! Agora escolha sua modalidade de hospedagem.</h4>
              <div className="TicketTypes">
                <PresentialWithoutHotel onClick={doesntWantHotel} clicked={withHotel}>
                  <h5>Sem Hotel</h5>
                  <h6>+ R$ 0</h6>
                </PresentialWithoutHotel>
                <PresentialWithHotel onClick={wantHotel} clicked={withHotel}>
                  <h5>Com Hotel</h5>
                  <h6>
                    + R$ {presencialComHotel[0].price ? presencialComHotel[0].price - presencialSemHotel[0].price : ''}
                  </h6>
                </PresentialWithHotel>
              </div>

              {withHotel === true ? (
                <ConfirmationTicket>
                  <h4>
                    Fechado! O total ficou em{' '}
                    <strong>R$ {presencialComHotel[0].price ? presencialComHotel[0].price : ''}</strong>. Agora é só
                    confirmar:
                  </h4>
                  <Button onClick={confirmTicket} disabled={reservationLoading}>
                    RESERVAR INGRESSO
                  </Button>
                </ConfirmationTicket>
              ) : (
                <></>
              )}

              {withHotel === false ? (
                <ConfirmationTicket>
                  <h4>
                    Fechado! O total ficou em{' '}
                    <strong>R$ {presencialSemHotel[0].price ? presencialSemHotel[0].price : ''}</strong>. Agora é só
                    confirmar:
                  </h4>
                  <Button onClick={confirmTicket} disabled={reservationLoading}>
                    RESERVAR INGRESSO
                  </Button>
                </ConfirmationTicket>
              ) : (
                <></>
              )}
            </PresentialTicketTypes>
          ) : (
            <></>
          )}

          {ticketTypes === false ? (
            <ConfirmationTicket>
              <h4>
                Fechado! O total ficou em <strong>R$ {online[0].price ? online[0].price : ''}</strong>. Agora é só
                confirmar:
              </h4>
              <Button onClick={confirmTicket} disabled={reservationLoading}>
                RESERVAR INGRESSO
              </Button>
            </ConfirmationTicket>
          ) : (
            <></>
          )}
        </PaymentPage>
      )}
    </>
  );
}

const PaymentPage = styled.div`
  h2 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-top: 35px;
    margin-bottom: 15px;
  }

  .TicketTypes {
    width: 310px;
    height: 145px;
    display: flex;
    background-color: white;
    margin-bottom: 26px;
    justify-content: space-between;
  }
`;

const PresentialTicketTypes = styled.div`
  width: 500px;
  height: 159px;
  background-color: white;
  display: flex;
  flex-direction: column;

  h4 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 15px;
  }

  h5 {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
  }

  h6 {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: #898989;
  }
`;

const TicketPresential = styled.div`
  width: 145px;
  height: 145px;
  border: ${(props) => (props.clicked === true ? '1px solid #FFEED2' : '1px solid #CECECE')};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.clicked === true ? '#FFEED2' : '#FFFFFF')};
  cursor: pointer;

  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
  }

  h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: #898989;
  }
`;

const TicketOnline = styled.div`
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.clicked === false ? '1px solid #FFEED2' : '1px solid #CECECE')};
  border-radius: 20px;
  background-color: ${(props) => (props.clicked === false ? '#FFEED2' : '#FFFFFF')};
  cursor: pointer;

  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #454545;
  }

  h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: #898989;
  }
`;

const PresentialWithHotel = styled.div`
  cursor: pointer;
  width: 145px;
  height: 145px;
  border: ${(props) => (props.clicked === true ? '1px solid #FFEED2' : '1px solid #CECECE')};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.clicked === true ? '#FFEED2' : '#FFFFFF')};
`;

const PresentialWithoutHotel = styled.div`
  cursor: pointer;
  width: 145px;
  height: 145px;
  border: ${(props) => (props.clicked === false ? '1px solid #FFEED2' : '1px solid #CECECE')};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.clicked === false ? '#FFEED2' : '#FFFFFF')};
`;

const ConfirmationTicket = styled.div`
  width: 510px;
  height: 159px;
  background-color: white;
  display: flex;
  flex-direction: column;

  h4 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 17px;
  }
`;

const Button = styled.button`
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  border: #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;

  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
`;
