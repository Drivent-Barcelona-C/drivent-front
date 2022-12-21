import { AccessDeniedActivitiesWrapper } from './AccessDeniedActivitiesWrapper';
import { StyledAccessDeniedMessage } from './StyledAccessDeniedMessage';

export default function AccessDeniedRemote() {
  return (
    <AccessDeniedActivitiesWrapper>
      <StyledAccessDeniedMessage variant="h5">Sua modalidade de ingresso não necessita escolher<br />atividades. Você terá acesso à todas as atividades.</StyledAccessDeniedMessage>
    </AccessDeniedActivitiesWrapper>
  );
}
