import ReservationList from '@pages/reservation-history/components/ReservationList';
import { useOwnerReservations } from '@pages/reservation-history/hooks/use-reservations';

interface OwnerReservationListProps {
  reservationState: string;
}

export default function OwnerReservationList({ reservationState }: OwnerReservationListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useOwnerReservations(reservationState);

  const reservations = data?.pages.flatMap(page => page?.content || []) || [];

  return (
    <ReservationList
      isProvider={true}
      reservations={reservations}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
    />
  );
}
