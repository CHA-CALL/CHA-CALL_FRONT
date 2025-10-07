import ReservationList from '@pages/reservation-history/components/ReservationList';
import { useUserReservations } from '@pages/reservation-history/hooks/use-reservations';

interface UserReservationListProps {
  reservationState: string;
}

export default function UserReservationList({ reservationState }: UserReservationListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useUserReservations(reservationState);

  const reservations = data?.pages.flatMap(page => page?.content || []) || [];

  const handleClickButton = () => {
    // TODO: 사장님 예약 상세 페이지 이동
  };

  return (
    <ReservationList
      isProvider={false}
      reservations={reservations}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      handleClickButton={handleClickButton}
    />
  );
}
