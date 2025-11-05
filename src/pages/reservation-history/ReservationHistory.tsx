import { useState } from 'react';

import ButtonFloating from '@ui/button-floating/ButtonFloating';
import ButtonTabGroup from '@ui/button-tab/ButtonTabGroup';
import { Icon } from '@components/icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import { useRole } from '@hooks/use-role';
import { ROLE } from '@constant/role';

import {
  OwnerReservationHistoryTabs,
  UserReservationHistoryTabs,
} from '@pages/reservation-history/constant/reservation-history';
import {
  RESERVATION_STATE,
  type ReservationState,
} from '@pages/reservation-history/types/reservation-history';
import ReservationList from '@pages/reservation-history/components/ReservationList';

export default function ReservationHistory() {
  const { role } = useRole();
  const isProvider = role === ROLE.PROVIDER;

  const [reservationState, setReservationState] = useState<ReservationState>(
    RESERVATION_STATE.UPCOMING
  );

  const handleSelectReservationState = (state: ReservationState) => {
    setReservationState(state);
  };

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
      <ReservationList
        isProvider={isProvider}
        reservationState={reservationState}
      />
    </>
  );
}
