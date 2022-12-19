import { AccessDeniedActivitiesWrapper } from './AccessDeniedActivitiesWrapper';
import { StyledAccessDeniedMessage } from './StyledAccessDeniedMessage';

export default function AccessDeniedNotPaid() {
  return (
    <AccessDeniedActivitiesWrapper>
      <StyledAccessDeniedMessage variant="h5">Você precisa ter confirmado o pagamento<br />antes de fazer a escolha de atividades.</StyledAccessDeniedMessage>
    </AccessDeniedActivitiesWrapper>
  );
}
