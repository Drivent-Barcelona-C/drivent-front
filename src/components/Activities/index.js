import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import AccessDeniedNotPaid from './AccessDeniedNotPaid';
import AccessDeniedRemote from './AccessDeniedRemote';
import ActivitiesSchedule from './ActivitiesSchedule';

export default function ActivitiesList() {
  //const { ticket } = useTicket(); -puxar o ticket da API
  let ticket = null;

  function fakeTicket(remote, hotel, status) {
    const mockado = {
      id: 2,
      ticketTypeId: {
        name: 'teste mockado',
        price: 50000,
        isRemote: remote,
        includesHotel: hotel
      },
      enrollmentId: 1,
      status: status
    };

    return mockado;
  }

  try {
    ticket = fakeTicket(false, true, 'PAID');
  } catch (error) {
    console.error(error);
  }

  function accessType() {
    if (ticket.status === 'RESERVED') {
      return <AccessDeniedNotPaid/>;
    } else if (ticket.ticketTypeId.isRemote && ticket.status === 'PAID') {
      return <AccessDeniedRemote/>;
    } else {
      return <ActivitiesSchedule/>;
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {accessType()}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
