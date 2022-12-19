import { useState, useEffect } from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';

import useCep from '../../hooks/api/useCep';
import useSaveEnrollment from '../../hooks/api/useSaveEnrollment';
import { useForm } from '../../hooks/useForm';

import Input from '../Form/Input';
import Button from '../Form/Button';
import Select from '../../components/Form/Select';
import AccessDeniedNotPaid from './AccessDeniedNotPaid';
import AccessDeniedRemote from './AccessDeniedRemote';
import ActivitiesSchedule from './ActivitiesSchedule';

dayjs.extend(CustomParseFormat);

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
