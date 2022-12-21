import styled from 'styled-components';
import Button from '../Form/Button';

export default function StyledButton({ children, ...props }) {
  return (
    <HotelButton {...props}>
      {children}
    </HotelButton>
  );
}

const HotelButton = styled(Button)`
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #000000;
  margin-top: 46px !important;
`;
