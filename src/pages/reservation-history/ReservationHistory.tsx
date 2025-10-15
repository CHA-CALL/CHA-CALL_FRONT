import { useEffect, useState } from 'react';

import ButtonFloating from '@components/button-floating/ButtonFloating';
import ButtonTabGroup from '@components/button-tab/ButtonTabGroup';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import { useRole } from '@hooks/use-role';
import { ROLE } from '@shared/constant/role';

import {
  OwnerReservationHistoryTabs,
  UserReservationHistoryTabs,
} from '@pages/reservation-history/constant/reservation-history';
import {
  RESERVATION_STATE,
  type ReservationState,
} from '@pages/reservation-history/types/reservation';
import EmptyView from '@pages/reservation-history/components/EmptyView';
import { mockup } from '@pages/reservation-history/mockup';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';

export default function ReservationHistory() {
  const navigate = useNavigate();
  const { role } = useRole();
  const isProvider = role !== ROLE.PROVIDER;

  const [reservationState, setReservationState] = useState<ReservationState>(
    RESERVATION_STATE.UPCOMING
  );

  const handleSelectReservationState = (state: string) => {
    setReservationState(state);
  };

  const handleToReservationDetail = (reservationId: string) => {
    navigate(ROUTES.RESERVATION_DETAIL(reservationId));
  };

  useEffect(() => {
    // alert(reservationState);
  }, [reservationState]);

  return (
    <>
      <Navigation leftIcon={<Icon name='ic_back' />} text='예약내역' />
      <ButtonTabGroup
        tabs={
          isProvider ? OwnerReservationHistoryTabs : UserReservationHistoryTabs
        }
        handleTabChange={handleSelectReservationState}
      />
      <ButtonFloating />
      {mockup.length === 0 ? (
        <EmptyView
          isProvider={isProvider}
          reservationState={reservationState}
        />
      ) : (
        <div className='flex flex-col gap-[2rem] px-[2rem] pb-[2.6rem] pt-[9rem]'>
          {mockup.map((reservation, index) => (
            <button
              key={reservation.id}
              className='flex flex-col gap-[2rem]'
              onClick={() => handleToReservationDetail(String(reservation.id))}
            >
              <span className='heading-sb-20'>{reservation.name}</span>
              {index !== mockup.length - 1 && (
                <div className='h-[0.1rem] w-full bg-grayscale-100' />
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
