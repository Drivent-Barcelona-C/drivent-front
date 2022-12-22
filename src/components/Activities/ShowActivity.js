import styled from 'styled-components';
import { FiXCircle } from 'react-icons/fi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function ShowActivity({ activity }) {
  const vacancies = activity.capacity - activity.activityBookings;
  console.log(activity);
  const start = dayjs(activity.startHour);
  const end = dayjs(activity.endHour);
  const durationActivity = dayjs.duration(end.diff(start)).format('HH:mm');
  const hour = durationActivity.split(':')[0];
  const min = durationActivity.split(':')[1];

  return (
    <BoxActivity duration={(hour * 80) + ((min / 60) * 80)}>
      <div>
        <p>{activity.name}</p>
        <p className='hourActivity'>
          {dayjs(activity.startHour).format('HH:mm')} - {dayjs(activity.endHour).format('HH:mm')}
        </p>
      </div>
      <ButtonIconBox>
        <FiXCircle />
        <p className='vacanciesActivity'>{vacancies} vagas</p>
      </ButtonIconBox>
    </ BoxActivity>
  );
}

const BoxActivity = styled.div`
  max-width: 265px;
  background: #F1F1F1;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  p{
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
  }
  .hourActivity{
    font-weight: 400;
    margin-top: 5px;
  }
  .vacanciesActivity{
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    color: #078632;
    margin-top: 5px;
  }
  div:nth-child(1){
    max-width: 130px;
  }
  ${(props) => {
    if (props.duration > 80) {
      return `
        height: ${props.duration + ((10 * (props.duration / 80))) - 10}px;
      `;
    }
    else {
      return `
        height: ${props.duration}px;
      `;
    }
  }}
`;

const ButtonIconBox = styled.div`
  min-width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #CFCFCF;
`;
