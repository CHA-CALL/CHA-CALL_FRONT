import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import EmptyView from '@pages/reservation-history/components/EmptyView';
import FoodTruckCard from '@components/food-truck-card/FoodTruckCard';
import Loading from '@components/loading/Loading';
import { useReservations } from '@pages/reservation-history/hooks/use-reservations';
import { useInView } from 'react-intersection-observer'

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

  if (reservations?.[0]?.content?.length === 0) {
    return (
      <EmptyView
        isProvider={isProvider}
        reservationState={reservationState}
      />
    );
  }

  return (
    <div className='flex flex-col gap-[2rem] px-[2rem] pb-[5.6rem] pt-[9rem]'>
      {reservations?.map((reservation, reservationIndex) => (
        <div key={reservationIndex}>
          {reservation?.content?.map((content, contentIndex) => (
            <div key={content?.reservationId} className='flex flex-col gap-[2rem]'>
              <FoodTruckCard
                variant={isProvider ? 'reservationProvider' : 'reservationClient'}
                data={content}
                handleClickButton={handleReservationDetail}
              />
              {contentIndex !== (reservation?.content?.length ?? 0) - 1 && (
                <div className='h-[0.1rem] w-full mb-[2rem] bg-grayscale-100' />
              )}
            </div>
          ))}
          {reservationIndex !== reservations.length - 1 && (
            <div className='h-[0.1rem] w-full mt-[2rem] bg-grayscale-100' />
          )}
        </div>
      ))}

      {isFetchingNextPage && <Loading />}
      {hasNextPage && <div ref={ref} className='h-[10rem] w-full' />}
    </div>
  );
}
