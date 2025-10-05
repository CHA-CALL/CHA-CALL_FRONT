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
import EmptyView from '@pages/reservation-history/components/EmptyView';

import {
  useOwnerReservations,
  useUserReservations,
} from '@pages/reservation-history/hooks/use-reservations';
import { splitDateTime } from '@utils/split-date-time';

export default function ReservationHistory() {
  const { role } = useRole();
  // TODO: === 으로 수정 필요
  const isProvider = role !== ROLE.PROVIDER;

  const [reservationState, setReservationState] = useState<ReservationState>(
    RESERVATION_STATE.UPCOMING
  );

  const {
    data,
    // fetchNextPage,
    hasNextPage,
    // isFetchingNextPage,
  } = useOwnerReservations(reservationState);

  const {
    data: userData,
    // fetchNextPage: userFetchNextPage,
    hasNextPage: userHasNextPage,
    // isFetchingNextPage: userIsFetchingNextPage,
  } = useUserReservations(reservationState);

  const reservations = data?.pages.flatMap(page => page?.content || []) || [];

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
      {reservations.length === 0 ? (
        <EmptyView
          isProvider={isProvider}
          reservationState={reservationState}
        />
      ) : (
        <div className='flex flex-col gap-[2rem] px-[2rem] pb-[2.6rem] pt-[9rem]'>
          {reservations.map((reservation, index) => (
            <div key={reservation.reservationId} className='flex flex-col gap-[2rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <img src={reservation.profileImage} alt={reservation.name} />
                <span>{reservation.name} [{reservation.foodTruckName}]</span>
                <span>{reservation.address}</span>
                <span>{reservation.dateTimeInfos?.[0] ? splitDateTime(reservation.dateTimeInfos[0]).date : ''}</span>
                <span>{reservation.dateTimeInfos?.[0] ? splitDateTime(reservation.dateTimeInfos[0]).time : ''}</span>
              </div>
              {index !== reservations.length - 1 && (
                <div className='h-[0.1rem] w-full bg-grayscale-100' />
              )}
            </div>
          ))}

          {/* 무한스크롤 */}
          {hasNextPage && (
            <></>
          )}
        </div>
      )}
    </>
  );
}
