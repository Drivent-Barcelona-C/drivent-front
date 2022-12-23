import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHasTicket from '../../hooks/api/useHasTicket';
import useTicketTypes from '../../hooks/api/useTicketTypes';

import AccessDeniedNotPaid from './AccessDeniedNotPaid';
import AccessDeniedRemote from './AccessDeniedRemote';
import ActivitiesSchedule from './ActivitiesSchedule';

export default function ActivitiesList() {
  const { ticket } = useHasTicket();
  const { ticketType } = useTicketTypes();

  function accessType() {
    if (ticketType && ticketType[0].isRemote) {
      return <AccessDeniedRemote />;
    } else if (ticket && ticket.status === 'RESERVED') {
      return <AccessDeniedNotPaid />;
    } else {
      return <ActivitiesSchedule />;
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
