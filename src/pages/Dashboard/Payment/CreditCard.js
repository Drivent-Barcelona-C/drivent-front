import React from 'react';
import { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';

import { toast } from 'react-toastify';

export default function CreditCard({ ticketId, postPayment, paymentLoading, setStatus }) {
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [focus, setFocus] = useState('');
  const [type, setType] = useState('');

  async function finishPayment() {
    const body = {
      ticketId,
      cardData: {
        issuer: type.issuer,
        number,
        name,
        expirationDate: expiry,
        cvv: cvc,
      },
    };
    try {
      await postPayment(body);
      toast('Pagamento realizado com sucesso');
      setStatus(true);
    } catch (error) {
      toast('Não foi possivel realizar o pagamento');
    }
  }
  return (
    <>
      <Wraper>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
          callback={(func) => setType(func)}
        />
        <Forms autoComplete="off">
          <NumberBox>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength={16}
              required
              autoComplete="off"
            />
            <Eg>E.g.:49...,51...,36...,37...</Eg>
          </NumberBox>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
            autoComplete="off"
          />
          <InputBox>
            <input
              type="text"
              name="expiry"
              placeholder="Valid Thru"
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength={4}
              required
              autoComplete="off"
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength={3}
              required
              autoComplete="off"
            />
          </InputBox>
        </Forms>
      </Wraper>
      <Button onClick={finishPayment} disabled={paymentLoading}>
        finalizar Pagamento
      </Button>
    </>
  );
}

const Wraper = styled.div`
  display: flex;
  margin-right: 100%;
  margin-bottom: 30px;
`;

const Forms = styled.form`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  input {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #8e8e8e;
    ::placeholder {
      color: #8e8e8e;
      font-size: 20px;
    }
  }
  input:focus {
    box-shadow: 0 0 0 0;
    outline: none;
  }
`;

const InputBox = styled.div`
  display: flex;
  input:first-child {
    width: 180px;
    margin-right: 20px;
  }
  input:nth-child(2) {
    width: 100px;
  }
`;

const Eg = styled.div`
  margin-right: 135px;
  color: #8e8e8e;
  font-size: 16px;
`;

const NumberBox = styled.div`
  display: flex;
  flex-direction: column;
`;
