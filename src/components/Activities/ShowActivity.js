import styled from 'styled-components';
import { useContext } from 'react';
import ActivitiesContext from '../../contexts/ActivitiesContext';

import { toast } from 'react-toastify';
import { BsCheckCircle, BsXCircle, BsBoxArrowInRight } from 'react-icons/bs';
import useSubscribeActivity from '../../hooks/api/useSubscribeActivity';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function ShowActivity({ activity }) {
  const vacancies = activity.capacity - activity.activityBookings;
  const { postActivity } = useSubscribeActivity();

  const { activities, setActivities } = useContext(ActivitiesContext);

  const start = dayjs(activity.startHour);
  const end = dayjs(activity.endHour);
  const durationActivity = dayjs.duration(end.diff(start)).format('HH:mm');
  const hour = durationActivity.split(':')[0];
  const min = durationActivity.split(':')[1];

  function subscribleActivity(activityId) {
    const promise = postActivity({ activityId });
    promise
      .then((res) => {
        const index = activities.findIndex(a => a.id === activity.id);
        const newActivities = [...activities];
        newActivities[index].isUserEnrolled = true;
        setActivities(newActivities);
        toast('Inscrição realizada com sucesso!');
      })
      .catch((err) => {
        toast('Não foi possível relizar inscrição!');
      });
  }
  return (
    <BoxActivity duration={(hour * 80) + ((min / 60) * 80)} registered={activity.isUserEnrolled}>
      <div>
        <p>{activity.name}</p>
        <p className='hourActivity'>
          {dayjs(activity.startHour).format('HH:mm')} - {dayjs(activity.endHour).format('HH:mm')}
        </p>
      </div>
      {activity.isUserEnrolled ?
        <ButtonIconBox>
          <BsCheckCircle onClick={() => toast('Você já esta inscrito nesta atividade!')} />
          <p className='vacanciesActivity'>Inscrito</p>
        </ButtonIconBox> :
        <ButtonIconBox soldOut={vacancies < 1}>
          {vacancies > 1 ?
            <>
              <BsBoxArrowInRight onClick={() => subscribleActivity(activity.id)} />
              <p className='vacanciesActivity'>{vacancies} vagas</p>
            </> :
            <>
              <BsXCircle onClick={() => toast('Ingressos esgotados!')} />
              <p className='vacanciesActivity'> Esgotado</p>
            </>}
        </ButtonIconBox>}
    </ BoxActivity>
  );
}

const BoxActivity = styled.div`
  max-width: 265px;
  background: #F1F1F1;
  border-radius: 5px;
  padding: 10px 0 10px 10px;
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
  ${(props) => {
    if (props.registered) {
      return `
        background: #D0FFDB;
      `;
    }
  }}
`;

const ButtonIconBox = styled.div`
  min-width: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #CFCFCF;
  color: #078632;
  cursor: pointer;
  
  .vacanciesActivity{
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    margin-top: 5px;
    color: #078632;
  }
  ${(props) => {
    if (props.soldOut) {
      return `
        color: #CC6666;
        .vacanciesActivity{
          color: #CC6666;
        }
      `;
    }
  }}
`;
