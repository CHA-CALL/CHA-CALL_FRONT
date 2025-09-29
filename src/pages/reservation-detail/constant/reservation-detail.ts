import type { ReservationResponse } from 'apis/data-contracts';

export const INITIAL_DATA: ReservationResponse = { deposit: 0 };

export const MOCKUP_DATA_PROVIDER: ReservationResponse = {
  address: '서울 광진구 화양동',
  detailAddress: '능동로 12',
  reservationDates: ['2025.09.20 - 2025.09.30', '2025.10.15 - 2025.10.16'],
  operationHour: '15:00 - 16:00',
  menu: '떡볶이, 순대, 튀김',
  deposit: 50000,
  isUseElectricity: true,
  etcRequest:
    '주차 공간이 넓었으면 좋겠습니다. 음식 많이 주세요. 늦지 말아주세요',
};

export const MOCKUP_DATA_CLIENT: ReservationResponse = {
  address: '서울 광진구 화양동',
  detailAddress: '능동로 12',
  reservationDates: ['2025.09.20 - 2025.09.30', '2025.10.15 - 2025.10.16'],
  operationHour: '15:00 - 16:00',
  menu: '떡볶이, 순대, 튀김',
  deposit: 50000,
  isUseElectricity: true,
  etcRequest:
    '주차 공간이 넓었으면 좋겠습니다. 음식 많이 주세요. 늦지 말아주세요',
};
