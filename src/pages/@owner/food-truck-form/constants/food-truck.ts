export const FOOD_TRUCK_MAX_LENGTH = {
  name: {
    min: 1,
    max: 10,
  },
  description: {
    min: 1,
    max: 30,
  },
  phoneNumber: {
    min: 1,
    max: 13,
  },
  regionCodes: {
    min: 1,
    max: 10,
  },
  operationalInformation: {
    max: 800,
  },
  etc: {
    max: 800,
  },
  availableDates: {
    min: 1,
    max: 2,
  },
  photoUrls: {
    min: 1,
    max: 9,
  },
  menus: {
    min: 1,
  },
} as const;

export const FOOD_TRUCK_ERROR_MESSAGE = {
  name: {
    required: '푸드트럭 이름을 입력해주세요.',
    max: `푸드트럭 이름은 ${FOOD_TRUCK_MAX_LENGTH.name.max}자 이하로 입력해주세요.`,
  },
  nameDuplicate: {
    required: '푸드트럭 이름을 중복확인해주세요.',
    duplicated: '이미 존재하는 이름입니다.',
    notDuplicated: '중복체크를 해주세요.',
    success: '사용 가능한 이름입니다.',
  },
  description: {
    required: '푸드트럭 설명을 입력해주세요.',
    max: `푸드트럭 설명은 ${FOOD_TRUCK_MAX_LENGTH.description.max}자 이하로 입력해주세요.`,
  },
  phoneNumber: {
    required: '푸드트럭 전화번호를 입력해주세요.',
  },
  regionCodes: {
    required: '푸드트럭 운영 지역을 선택해주세요.',
    max: `푸드트럭 운영 지역은 ${FOOD_TRUCK_MAX_LENGTH.regionCodes.max}개 이하로 선택해주세요.`,
  },
  activeTime: {
    start: '시작 시간을 선택해주세요.',
    end: '종료 시간을 선택해주세요.',
    invalid: '시작 시간은 종료시간보다 앞에 있어야합니다.',
  },
  locations: {
    min: '푸드트럭의 활동가능 지역을 선택해주세요.',
  },
  menus: {
    required: '메뉴를 등록해주세요.',
    success: '메뉴 등록이 완료되었습니다.',
  },
  operationalInformation: {
    max: `푸드트럭 운영 정보는 ${FOOD_TRUCK_MAX_LENGTH.operationalInformation.max}자 이하로 입력해주세요.`,
  },
  etc: {
    max: `기타 정보는 ${FOOD_TRUCK_MAX_LENGTH.etc.max}자 이하로 입력해주세요.`,
  },
  availableDates: {
    min: `가능한 일정대는 ${FOOD_TRUCK_MAX_LENGTH.availableDates.min}개 이상 선택해주세요.`,
    max: `가능한 일정대는 ${FOOD_TRUCK_MAX_LENGTH.availableDates.max}개 이하로 선택해주세요.`,
    invalid: '가능한 일정대는 겹치지 않게 설정해주세요.',
    incomplete: '기존 일정을 완성한 후 새로운 일정을 추가해주세요.',
  },
  photoUrls: {
    max: `푸드트럭 사진은 ${FOOD_TRUCK_MAX_LENGTH.photoUrls.max}개까지 업로드할 수 있습니다.`,
    required: '푸드트럭 사진을 업로드해주세요.',
    success: '사진이 등록되었습니다.',
  },
} as const;
