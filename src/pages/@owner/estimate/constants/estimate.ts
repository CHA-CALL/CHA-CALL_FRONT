export const ESTIMATE_MAX_LENGTH = {
  location: {
    min: 1,
    max: 20,
  },
  detailLocation: {
    min: 1,
  },
  food: {
    min: 1,
    max: 100,
  },
  etc: {
    max: 200,
  },
  availableDates: {
    min: 1,
    max: 4,
  },
} as const;

export const ESTIMATE_ERROR_MESSAGE = {
  location: {
    min: '시/군/구를 입력해주세요.',
    max: `시/군/구는 ${ESTIMATE_MAX_LENGTH.location.max}자 이하로 입력해주세요.`,
  },
  detailLocation: {
    min: '상세 주소를 입력해주세요.',
  },
  food: {
    required: '음식을 입력해주세요.',
    max: `음식은 ${ESTIMATE_MAX_LENGTH.food.max}자 이하로 입력해주세요.`,
  },
  price: {
    required: '금액을 입력해주세요.',
  },
  availableDates: {
    min: `가능한 일정대는 ${ESTIMATE_MAX_LENGTH.availableDates.min}개 이상 선택해주세요.`,
    max: `가능한 일정대는 ${ESTIMATE_MAX_LENGTH.availableDates.max}개 이하로 선택해주세요.`,
    invalid: '일정이 겹칩니다. 다른 일정을 선택해주세요.',
    incomplete: '기존 일정을 완성한 후 새로운 일정을 추가해주세요.',
  },
  activeTime: {
    start: `운영 시작 시간을 선택해주세요.`,
    end: `운영 종료 시간을 선택해주세요.`,
    invalid: `운영 시작 시간은 운영 종료 시간보다 앞에 있어야합니다.`,
  },
  etc: {
    max: `푸드트럭 운영 정보는 ${ESTIMATE_MAX_LENGTH.etc.max}자 이하로 입력해주세요.`,
  },
} as const;
