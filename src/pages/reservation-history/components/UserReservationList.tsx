import ReservationList from '@pages/reservation-history/components/ReservationList';
import { useUserReservations } from '@pages/reservation-history/hooks/use-reservations';

interface UserReservationListProps {
  reservationState: string;
}

export default function UserReservationList({ reservationState }: UserReservationListProps) {
  const {
    data,
    hasNextPage
  } = useUserReservations(reservationState);

  const reservations = data?.pages.flatMap(page => page?.content || []) || [];

  return (
    <ReservationList
      isProvider={false}
      reservations={reservations}
      hasNextPage={hasNextPage}
    />
  );
}