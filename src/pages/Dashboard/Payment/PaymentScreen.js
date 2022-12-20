import Box from '../../../components/Box';
import { Subtitle } from '../../../components/Subtitle';
import CreditCard from './CreditCard';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import React from 'react';
import useProcessPayment from '../../../hooks/api/useProcessPayment';
import { useEffect } from 'react';
import { useState } from 'react';

export default function PaymentScreen({ ticket }) {
  const { postPayment, paymentLoading } = useProcessPayment();
  const [status, setStatus] = useState(false);
  useEffect(() => {}, [status]);

  return (
    <>
      <Subtitle>Ingresso escolhido</Subtitle>
      <Box>
        <div>
          {ticket.TicketType.name}
          {ticket.TicketType.includesHotel ? ' + Com Hotel' : ''}
        </div>
        <div>R$ {ticket.TicketType.price}</div>
      </Box>
      <Subtitle>Pagamento</Subtitle>
      {ticket.status === 'PAID' || status === true ? (
        <Pay>
          <FaCheckCircle color="green" fontSize="44px" />
          <PaymentMessage>
            Pagamento confirmado!
            <div>Prossiga para escolha de hospedagem e atividades</div>
          </PaymentMessage>
        </Pay>
      ) : (
        <CreditCard
          ticketId={ticket.id}
          postPayment={postPayment}
          paymentLoading={paymentLoading}
          setStatus={setStatus}
        />
      )}
    </>
  );
}

const PaymentMessage = styled.div`
  color: #454545;
  margin-left: 15px;
  font-weight: bold;
  font-size: 16px;
  div {
    font-weight: lighter;
  }
`;
const Pay = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 15px;
  }
`;
