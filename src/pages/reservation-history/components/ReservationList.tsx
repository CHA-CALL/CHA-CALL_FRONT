import { useEffect, useRef } from 'react';
import type {
  OwnerReservationHistoryResponse,
  MemberReservationHistoryResponse
} from 'apis/data-contracts';
import EmptyView from '@pages/reservation-history/components/EmptyView';
import { splitDateTime } from '@utils/split-date-time';
// TODO: Card 컴포넌트 import

interface ReservationListProps {
  isProvider: boolean;
  reservations: OwnerReservationHistoryResponse[] | MemberReservationHistoryResponse[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading?: boolean;
}

export default function ReservationList({
  isProvider,
  reservations,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: ReservationListProps) {
  const nextFetchTargetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const fetchCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(fetchCallback, options);

    if (nextFetchTargetRef.current) {
      observer.observe(nextFetchTargetRef.current);
    }
  }, [reservations, hasNextPage, fetchNextPage]);

  if (reservations.length === 0) {
    return <EmptyView isProvider={isProvider} reservationState={'UPCOMING'} />;
  }

  const isOwnerReservation = (
    reservation: OwnerReservationHistoryResponse | MemberReservationHistoryResponse
  ): reservation is OwnerReservationHistoryResponse => {
    return 'profileImage' in reservation && 'foodTruckName' in reservation;
  };

  return (
    <div className='flex flex-col gap-[2rem] px-[2rem] pb-[2.6rem] pt-[9rem]'>
      {reservations.map((reservation, index) => (
        <div key={reservation.reservationId} className='flex flex-col gap-[2rem]'>
          <div className='flex flex-col gap-[1rem]'>
            {isProvider && isOwnerReservation(reservation) ? (
              <>
                <img src={reservation.profileImage} alt={reservation.name} />
                <span>{reservation.name} [{reservation.foodTruckName}]</span>
              </>
            ) : !isProvider && !isOwnerReservation(reservation) ? (
              <>
                <img src={reservation.photoUrl} alt={reservation.name} />
                <span>{reservation.name}</span>
              </>
            ) : null}
            <span>{reservation.address}</span>
            <span>{reservation.dateTimeInfos?.[0] ? splitDateTime(reservation.dateTimeInfos[0]).date : ''}</span>
            <span>{reservation.dateTimeInfos?.[0] ? splitDateTime(reservation.dateTimeInfos[0]).time : ''}</span>
          </div>
          {index !== reservations.length - 1 && (
            <div className='h-[0.1rem] w-full bg-grayscale-100' />
          )}
        </div>
      ))}

      {!isLoading && hasNextPage &&
        <div ref={nextFetchTargetRef} />
      }
    </div>
  );
}
