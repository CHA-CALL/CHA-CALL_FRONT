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
} from '@pages/reservation-history/type/reservation';

export default function ReservationHistory() {
  const { role } = useRole();
  const isProvider = role === ROLE.PROVIDER;

  const [reservationState, setReservationState] = useState<ReservationState>(
    RESERVATION_STATE.UPCOMING
  );

  const handleSelectReservationState = (state: string) => {
    setReservationState(state);
  };

  useEffect(() => {
    console.log(reservationState);
  }, [reservationState]);
  return (
    <div>
      <Navigation leftIcon={<Icon name='ic_back' />} text='예약내역' />
      <ButtonTabGroup
        tabs={
          isProvider ? OwnerReservationHistoryTabs : UserReservationHistoryTabs
        }
        handleTabChange={handleSelectReservationState}
      />
      <ButtonFloating />
      <div className='flex flex-col gap-[2rem] px-[2rem] py-[2.6rem]'></div>
    </div>
  );
}
