import { Title } from '../../../components/Auth';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useHasTicket from '../../../hooks/api/useHasTicket';
import styled from 'styled-components';
import React from 'react';
import PaymentScreen from './PaymentScreen';

function PaymentOrTicketScreen() {
  const { ticket } = useHasTicket();
  return <>{ticket ? <PaymentScreen ticket={ticket} /> : 'SEM TICKET'}</>;
}

export default function Payment() {
  const { enrollment } = useEnrollment();
  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      {enrollment ? (
        <PaymentOrTicketScreen />
      ) : (
        <Message>'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'</Message>
      )}
    </>
  );
}

const Message = styled.div`
  width: 500px;
  height: 60px;
  color: #8e8e8e;
  font-size: 20px;
  margin: 27% auto;
  text-align: center;
`;
