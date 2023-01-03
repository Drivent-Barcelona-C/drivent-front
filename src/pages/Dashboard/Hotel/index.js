import useHasTicket from '../../../hooks/api/useHasTicket';
import styled from 'styled-components';
import ChooseHotel from './ChooseHotel';

export default function Hotel() {
  const { ticket } = useHasTicket();

  if (!ticket?.TicketType?.includesHotel) {
    return (
      <>
        <Main> Escolha hotel e quarto</Main>
        <Container>
          <NoPayment>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</NoPayment>
        </Container>
      </>
    );
  }

  return (
    <>
      <Main>Escolha hotel e quarto</Main>
      {ticket.status === 'PAID' ? (
        <ChooseHotel />
      ) : (
        <Container>
          <NoPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</NoPayment>
        </Container>
      )}
    </>
  );
}

const Main = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
`;

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 0 auto;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoPayment = styled.div`
  text-align: center;
  font-size: 20px;
  width: 53%;
  color: #8e8e8e;
`;
