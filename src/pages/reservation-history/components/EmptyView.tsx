import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { Icon } from '@icon/Icon';
import Button from '@ui/button/Button';
import {
  RESERVATION_STATE,
  type ReservationState,
} from '@pages/reservation-history/types/reservation-history';

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
      emptyText = '확정 신청된';
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
    <div className='fixed-center pointer-events-none absolute top-[0rem] flex min-h-[100dvh] w-full flex-col items-center justify-center gap-[1.6rem] pt-[6.6rem]'>
    <div className='fixed-center pointer-events-none absolute top-[0rem] flex min-h-[100dvh] w-full flex-col items-center justify-center gap-[1.6rem] pt-[6.6rem]'>
      <img src='https://placehold.co/140' alt='' />
      <span className='text-grayscale-500 body-m-14 text-center'>
      <span className='text-grayscale-500 body-m-14 text-center'>
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
          className='bg-grayscale-900 mt-[0.4rem] rounded-[9rem] px-[2rem] py-[1rem]'
          className='bg-grayscale-900 mt-[0.4rem] rounded-[9rem] px-[2rem] py-[1rem]'
          handleClickButton={handleNavigateToReservation}
        >
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_search'
              width={16}
              height={16}
              className='text-white'
            />
            <span className='title-sb-12 text-white'>푸드트럭 둘러보기</span>
            <span className='title-sb-12 text-white'>푸드트럭 둘러보기</span>
          </div>
        </Button>
      )}
    </div>
  );
}
