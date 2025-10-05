import { useState } from 'react';

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

import OwnerReservationList from '@pages/reservation-history/components/OwnerReservationList';
import UserReservationList from '@pages/reservation-history/components/UserReservationList';

export default function ReservationHistory() {
  const { role } = useRole();
  // TODO: === 으로 수정 필요
  const isProvider = role !== ROLE.PROVIDER;

  const [reservationState, setReservationState] = useState<ReservationState>(
    RESERVATION_STATE.UPCOMING
  );

  const handleSelectReservationState = (state: string) => {
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
      {isProvider
        ? <OwnerReservationList reservationState={reservationState} />
        : <UserReservationList reservationState={reservationState} />
      }
    </>
  );
}
