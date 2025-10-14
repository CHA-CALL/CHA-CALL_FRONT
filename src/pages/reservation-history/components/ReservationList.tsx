import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import EmptyView from '@pages/reservation-history/components/EmptyView';
import FoodTruckCard from '@components/food-truck-card/FoodTruckCard';
import Loading from '@components/loading/Loading';
import { useReservations } from '@pages/reservation-history/hooks/use-reservations';

interface ReservationListProps {
  isProvider: boolean;
  reservationState: ReservationState;
}

export default function ReservationList({
  isProvider,
  reservationState,
}: ReservationListProps) {
  const navigate = useNavigate();

  const nextFetchTargetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    reservations,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useReservations(isProvider, reservationState);

  const handleReservationDetail = () => {
    navigate(ROUTES.RESERVATION_DETAIL);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    observerRef.current = observer;
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage]);

  useEffect(() => {
    const observer = observerRef.current;
    const target = nextFetchTargetRef.current;

    if (!observer || !target) {
      return;
    }

    if (hasNextPage) {
      observer.observe(target);
    } else {
      observer.unobserve(target);
    }

    return () => {
      observer.unobserve(target);
    };
  }, [hasNextPage]);

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

      {isLoading && <Loading />}
      {hasNextPage && <div ref={nextFetchTargetRef} className='h-[10rem] w-full' />}
    </div>
  );
}
