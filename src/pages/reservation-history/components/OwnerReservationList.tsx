import ReservationList from '@pages/reservation-history/components/ReservationList';
import { useOwnerReservations } from '@pages/reservation-history/hooks/use-reservations';
import type { ReservationState } from '@pages/reservation-history/types/reservation';

interface OwnerReservationListProps {
  reservationState: ReservationState;
}

export default function OwnerReservationList({ reservationState }: OwnerReservationListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useOwnerReservations(reservationState);

  const reservations = data?.pages.flatMap(page => page?.content || []) || [];

  const handleClickButton = () => {
    // TODO: 사장님 예약 상세 페이지 이동
  };

  return (
    <ReservationList
      isProvider={true}
      reservations={reservations}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      handleClickButton={handleClickButton}
      reservationState={reservationState}
    />
  );
}
