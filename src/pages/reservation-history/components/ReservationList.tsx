import { useEffect, useRef } from 'react';
import type {
  OwnerReservationHistoryResponse,
  MemberReservationHistoryResponse
} from 'apis/data-contracts';
import EmptyView from '@pages/reservation-history/components/EmptyView';
import FoodTruckCard from '@components/food-truck-card/FoodTruckCard';

interface ReservationListProps {
  isProvider: boolean;
  reservations: OwnerReservationHistoryResponse[] | MemberReservationHistoryResponse[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  handleClickButton: () => void;
}

export default function ReservationList({
  isProvider,
  reservations,
  fetchNextPage,
  hasNextPage,
  handleClickButton,
}: ReservationListProps) {
  const nextFetchTargetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    const target = nextFetchTargetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (reservations.length === 0) {
    return <EmptyView isProvider={isProvider} reservationState={'UPCOMING'} />;
  }

  return (
    <div className='flex flex-col gap-[2rem] px-[2rem] pb-[2.6rem] pt-[9rem]'>
      {reservations.map((reservation, index) => (
        <div key={reservation.reservationId} className='flex flex-col gap-[2rem]'>
          <FoodTruckCard
            variant={isProvider ? 'reservationProvider' : 'reservationClient'}
            data={reservation}
            handleClickButton={handleClickButton}
          />
          {index !== reservations.length - 1 && (
            <div className='h-[0.1rem] w-full bg-grayscale-100' />
          )}
        </div>
      ))}

      {hasNextPage &&
        <div ref={nextFetchTargetRef} />
      }
    </div>
  );
}
