import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type {
  MemberReservationDetailResponse,
  OwnerReservationDetailResponse,
} from 'apis/data-contracts';

import { RESERVATION_DETAIL_KEY } from '@shared/querykey/reservation-detail';

import { ROLE } from '@shared/constant/role';

import {
  getMemberReservationDetail,
  getOwnerReservationDetail,
} from '@pages/reservation-detail/api';
import type { ReservationDetailTopContentProps } from '@pages/reservation-detail//components/ReservationDetailTopContent';

export interface ReservationPartialInfo {
  label: string;
  data: string | string[] | undefined;
}

export const useReservationDetail = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  // TODO : useRole 동작 시, 주석 해제. (현재 logout으로 적용됨.)
  // const { role } = useRole();
  // const isProvider = role === ROLE.PROVIDER;
  const isProvider = false;

  const {
    data: reservationDetailData,
    isPending,
    error,
    isError,
  } = useQuery<
    | (MemberReservationDetailResponse & OwnerReservationDetailResponse)
    | undefined
  >({
    queryKey: RESERVATION_DETAIL_KEY.DETAIL(isProvider, reservationId),
    queryFn: () =>
      isProvider
        ? getOwnerReservationDetail(reservationId!)
        : getMemberReservationDetail(reservationId!),
  });

  const topContents: ReservationDetailTopContentProps = isProvider
    ? {
        role: ROLE.PROVIDER,
        foodTruckName: '푸드트럭 이름',
        clientName: reservationDetailData?.name,
        profileImage: reservationDetailData?.profileImage,
      }
    : {
        role: ROLE.CLIENT,
        photoUrl: reservationDetailData?.photoUrl,
        foodTruckName: reservationDetailData?.name,
        // TODO: 푸드트럭 상세정보로 이동 라우트 설정
        handleTruckDetail: () => alert('푸드트럭 상세 정보로 이동'),
      };

  const reservationInfo = [
    {
      label: '장소',
      data: reservationDetailData?.address,
    },
    {
      label: '날짜',
      data: reservationDetailData?.dateTimeInfos,
    },
  ];

  const operationInfo = [
    {
      label: '음식',
      data: reservationDetailData?.menu,
    },
    {
      label: '결제금',
      data:
        reservationDetailData?.deposit &&
        `${parseInt(reservationDetailData?.deposit).toLocaleString()} 원`,
    },
  ];

  const etcInfo = [
    {
      label: '전기 사용 유무',
      data: reservationDetailData?.electricityInfo,
    },
    {
      label: '기타 요청 사항',
      data: reservationDetailData?.etcRequest,
    },
  ];

  const handleDownload = () => {
    //TODO : 다운로드 API 연동 예정
    alert('다운로드 버튼 클릭');
  };

  return {
    reservationInfo,
    operationInfo,
    etcInfo,
    topContents,
    handleDownload,
    isPending,
    error,
    isError,
  };
};
