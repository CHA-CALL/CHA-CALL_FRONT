import ReservationList from '@pages/reservation-history/components/ReservationList';
import { useUserReservations } from '@pages/reservation-history/hooks/use-reservations';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import type { MemberReservationHistoryResponse } from 'apis/data-contracts';

interface UserReservationListProps {
  reservationState: ReservationState;
}

export default function UserReservationList({ reservationState }: UserReservationListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useUserReservations(reservationState);

  const reservations = data?.pages.reduce<MemberReservationHistoryResponse[]>((acc, page) => {
      return acc.concat(page?.content || []);
    }, []) || [];

  const handleClickButton = () => {
    // TODO: 유저 예약 상세 페이지 이동
  };

  return (
    <ReservationList
      isProvider={false}
      reservations={reservations}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      handleClickButton={handleClickButton}
      reservationState={reservationState}
    />
  );
}
