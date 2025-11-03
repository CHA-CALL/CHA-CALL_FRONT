import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type {
  MemberReservationDetailResponse,
  OwnerReservationDetailResponse,
} from 'apis/data-contracts';

import useToast from '@hooks/use-toast';
import { ROUTES } from '@router/constant/routes';
import { RESERVATION_DETAIL_KEY } from '@query-key/reservation-detail';
import { ROLE } from '@constant/role';
import {
  getMemberReservationDetail,
  getOwnerReservationDetail,
} from '@pages/reservation-detail/api';
import type { ReservationDetailTopContentProps } from '@pages/reservation-detail/components/ReservationDetailTopContent';

export interface ReservationPartialInfo {
  label: string;
  data: string | string[] | undefined;
}

export const useReservationDetail = () => {
  const navigate = useNavigate();
  const { reservationId } = useParams<{ reservationId: string }>();
  const toast = useToast();
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
    | (MemberReservationDetailResponse | OwnerReservationDetailResponse)
    | undefined
  >({
    queryKey: RESERVATION_DETAIL_KEY.DETAIL(isProvider, reservationId),
    queryFn: () => {
      if (!reservationId) {
        throw new Error('요청이 잘못되었습니다.');
      }
      return isProvider
        ? getOwnerReservationDetail(reservationId)
        : getMemberReservationDetail(reservationId);
    },
    enabled: Boolean(reservationId),
  });

  let topContents: ReservationDetailTopContentProps;

  if (isProvider) {
    const ownerData = reservationDetailData as OwnerReservationDetailResponse;
    topContents = {
      role: ROLE.PROVIDER,
      foodTruckName: ownerData?.foodTruckName,
      clientName: ownerData?.name,
      profileImage: ownerData?.profileImage,
    };
  } else {
    const memberData = reservationDetailData as MemberReservationDetailResponse;
    topContents = {
      role: ROLE.CLIENT,
      photoUrl: memberData?.photoUrl,
      foodTruckName: memberData?.name,
      // TODO: 푸드트럭 상세정보로 이동 라우트 설정. 푸드트럭 상세 페이지 머지 후 수정
      handleTruckDetail: () => alert('푸드트럭 상세 정보로 이동'),
    };
  }

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
        reservationDetailData?.deposit !== undefined
          ? `${reservationDetailData?.deposit.toLocaleString()} 원`
          : undefined,
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
    if (!reservationDetailData?.pdfUrl) {
      toast.error('현재 견적서가 없어 다운로드할 수 없습니다.');
      return;
    }
    window.open(
      reservationDetailData?.pdfUrl,
      '예약 견적서 다운로드',
      'noopener,noreferrer'
    );
  };

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.RESERVATION_HISTORY);
      toast.error(error?.message ?? '잘못된 접근입니다.');
    }
  }, [isError, error, navigate, toast]);

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
