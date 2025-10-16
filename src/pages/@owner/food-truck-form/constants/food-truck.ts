export const FOOD_TRUCK_ERROR_MESSAGE = {
  name: {
    required: '푸드트럭 이름을 입력해주세요.',
    max: '푸드트럭 이름은 15자 이하로 입력해주세요.',
  },
  description: {
    required: '푸드트럭 설명을 입력해주세요.',
    max: '푸드트럭 설명은 30자 이하로 입력해주세요.',
  },
  phoneNumber: {
    required: '푸드트럭 전화번호를 입력해주세요.',
    invalid: '푸드트럭 전화번호는 010-0000-0000 형식으로 입력해주세요.',
  },
  regionCodes: {
    required: '푸드트럭 운영 지역을 선택해주세요.',
    max: '푸드트럭 운영 지역은 10개 이하로 선택해주세요.',
  },
  time: '푸드트럭 운영 시간을 입력해주세요.',
  electricity: '푸드트럭 전기 사용 여부를 선택해주세요.',
  paymentMethod: '결제 방법을 선택해주세요.',
  locations: '푸드트럭의 활동가능 지역을 선택해주세요.',
  foodCategories: '판매음식 카테고리를 선택해주세요.',
  quantityCategory: '제조 가능 수량을 선택해주세요.',
  operationalInformation: {
    max: '푸드트럭 운영 정보는 800자 이하로 입력해주세요.',
  },
  etc: {
    max: '기타 정보는 800자 이하로 입력해주세요.',
  },
} as const;

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
  },
  regionCodes: {
    min: 1,
    max: 10,
  },
  availableQuantity: {
    required: '제조 가능 수량을 선택해주세요.',
  },
  operationalInformation: 800,
  etc: 800,
} as const;
