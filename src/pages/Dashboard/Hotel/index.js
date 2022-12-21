import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTicket } from '../../../services/ticketApi';
import ChooseHotel from './ChooseHotel';
import { getTokenStoraged } from '../../../hooks/useToken';

export default function Hotel() {
  const [ticket, setTicket] = useState('');
  const token = getTokenStoraged();

  useEffect(() => {
    getTicket(token).then((res) => {
      setTicket(res);
    });
  }, []);

  return (
    <>
      <Main> Escolha hotel e quarto</Main>
      <Container>
        {ticket.status === 'PAID' ? (
          <ChooseHotel TicketType={ticket.TicketType} />
        ) : (
          <NoPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</NoPayment>
        )}
      </Container>
    </>
  );
}

const Main = styled.div`
  font-family: Roboto;
  font-size: 34px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
`;

const NoPayment = styled.div`
  text-align: center;
  font-size: 20px;
  width: 53%;
  color: #8e8e8e;
`;
