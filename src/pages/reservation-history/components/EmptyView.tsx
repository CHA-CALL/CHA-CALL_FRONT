import {
  RESERVATION_STATE,
  type ReservationState,
} from '@pages/reservation-history/types/reservation';
import { ROUTES } from '@router/constant/routes';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import { useNavigate } from 'react-router-dom';

interface EmptyViewProps {
  isProvider: boolean;
  reservationState: ReservationState;
}

export default function EmptyView({
  isProvider,
  reservationState,
}: EmptyViewProps) {
  const navigate = useNavigate();

  const handleNavigateToReservation = () => {
    navigate(ROUTES.RESERVATION);
  };

  let emptyText: string;
  switch (reservationState) {
    case RESERVATION_STATE.UPCOMING:
      emptyText = '진행 예정인';
      break;
    case RESERVATION_STATE.CONFIRMED:
      emptyText = '진행 예정인';
      break;
    case RESERVATION_STATE.COMPLETED:
      emptyText = '이용 완료된';
      break;
    case RESERVATION_STATE.CANCELED:
      emptyText = '취소된';
      break;
    default:
      emptyText = '';
  }
  return (
    <div className='flex min-h-[calc(100vh-4.8rem)] w-full flex-col items-center justify-center gap-[1.6rem] pt-[6.6rem]'>
      <img src='https://placehold.co/140' alt='' />
      <span className='text-center text-grayscale-500 body-m-14'>
        {emptyText} {isProvider ? '예약건' : '예약 내역'}이 없습니다.
        {!isProvider && (
          <>
            <br />
            차콜에서 간편하게 푸드트럭을 예약해보세요!
          </>
        )}
      </span>
      {!isProvider && (
        <Button
          variant='default'
          buttonStyle='default'
          className='mt-[0.4rem] rounded-[9rem] bg-grayscale-900 px-[2rem] py-[1rem]'
          handleClickButton={handleNavigateToReservation}
        >
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_search'
              width={16}
              height={16}
              className='text-white'
            />
            <span className='text-white title-sb-12'>푸드트럭 둘러보기</span>
          </div>
        </Button>
      )}
    </div>
  );
}
