import type { ReservationResponse } from 'apis/data-contracts';
import { useEffect, useState } from 'react';
import {
  INITIAL_DATA,
  MOCKUP_DATA_CLIENT,
  MOCKUP_DATA_PROVIDER,
  MOCKUP_DATA_TOP_CONTENT_FOR_CLIENT,
  MOCKUP_DATA_TOP_CONTENT_FOR_PROVIDER,
} from '@pages/reservation-detail/constant/reservation-detail';
import { ROLE } from '@shared/constant/role';
import type { ReservationDetailTopContentProps } from '../components/ReservationDetailTopContent';

export interface ReservationPartialInfo {
  label: string;
  data: string | undefined;
}

export const useReservationDetail = () => {
  // TODO : useRole 동작 시, 주석 해제. (현재 logout으로 적용됨.)
  // const { role } = useRole();
  const role = ROLE.PROVIDER;
  const isProvider = role === ROLE.PROVIDER;

  const [reservationData, setReservationData] =
    useState<ReservationResponse>(INITIAL_DATA);
  const [contentProps, setContentProps] =
    useState<ReservationDetailTopContentProps | null>(null);

  const handleDownload = () => {
    //TODO : 다운로드 API 연동 예정
    alert('다운로드 버튼 클릭');
  };

  const {
    address,
    detailAddress,
    reservationDates,
    operationHour,
    menu,
    deposit,
    isUseElectricity,
    etcRequest,
  } = reservationData;

  const reservationInfo = [
    {
      label: '장소',
      data: `${address} ${detailAddress}`,
    },
    {
      label: '날짜',
      data: reservationDates?.join('\n'),
    },
    {
      label: '시간',
      data: operationHour,
    },
  ];

  const operationInfo = [
    {
      label: '음식',
      data: menu,
    },
    {
      label: '결제금',
      data: `${deposit?.toLocaleString('ko-kr')} 원`,
    },
  ];

  const etcInfo = [
    {
      label: '전기 사용 유무',
      data: isUseElectricity ? '가능' : '불가능',
    },
    {
      label: '기타 요청 사항',
      data: etcRequest,
    },
  ];

  useEffect(() => {
    // TODO : API 확정되면 로직 개선
    if (role === ROLE.PROVIDER) {
      setContentProps(MOCKUP_DATA_TOP_CONTENT_FOR_PROVIDER);
      setReservationData(MOCKUP_DATA_PROVIDER);
    } else if (role === ROLE.CLIENT) {
      setContentProps(MOCKUP_DATA_TOP_CONTENT_FOR_CLIENT);
      setReservationData(MOCKUP_DATA_CLIENT);
    }
  }, []);

  return {
    role,
    isProvider,
    reservationInfo,
    operationInfo,
    etcInfo,
    contentProps,
    handleDownload,
  };
};
