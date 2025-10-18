import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { useInView } from 'react-intersection-observer';
import FoodTruckCard from '@components/food-truck-card/FoodTruckCard';
import Loading from '@components/loading/Loading';
import EmptyView from '@pages/reservation-history/components/EmptyView';
import { useReservations } from '@pages/reservation-history/hooks/use-reservation-history';
import type { ReservationState } from '@pages/reservation-history/types/reservation-history';

interface ReservationListProps {
  isProvider: boolean;
  reservationState: ReservationState;
}

export default function ReservationList({
  isProvider,
  reservationState,
}: ReservationListProps) {
  const navigate = useNavigate();
  const { ref, inView } = useInView()

  const {
    reservations,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useReservations(isProvider, reservationState);

  const handleReservationDetail = () => {
    navigate(ROUTES.RESERVATION_DETAIL);
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (!reservations || reservations.length === 0) {
    return (
      <EmptyView
        isProvider={isProvider}
        reservationState={reservationState}
      />
    );
  }

  return (
    <div className='flex flex-col pb-[7.6rem] pt-[7rem]'>
      {reservations.map((reservation, index) => (
        <div key={reservation?.reservationId} className='flex flex-col'>
          <FoodTruckCard
            variant={isProvider ? 'reservationProvider' : 'reservationClient'}
            data={reservation}
            handleClickButton={handleReservationDetail}
          />
          {index !== reservations.length - 1 && (
            <div className='h-[0.1rem] w-full bg-grayscale-100' />
          )}
        </div>
      ))}

      {isFetchingNextPage && <Loading />}
      {hasNextPage && <div ref={ref} className='h-[10rem] w-full' />}
    </div>
  );
}
