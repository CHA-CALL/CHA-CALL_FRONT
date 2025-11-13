interface AgreementItemType {
  id: string;
  isAgreed: boolean;
  label: string;
  viewDetails: string;
  isRequired: boolean;
}

// TODO: 추후 링크 연동 (viewDetails)
const MEMBER_AGREEMENT_INITIAL_ITEMS: AgreementItemType[] = [
  {
    id: 'TERMS_MEMBER',
    isAgreed: false,
    label: '차콜 회원 약관 및 동의사항',
    viewDetails: 'https://www.naver.com/',
    isRequired: true,
  },
  {
    id: 'TERMS_PERSONAL_INFO',
    isAgreed: false,
    label: '개인정보 수집 및 이용 동의',
    viewDetails: 'https://www.naver.com/',
    isRequired: true,
  },
  {
    id: 'TERMS_LOCATION',
    isAgreed: false,
    label: '위치정보 이용약관 (선택)',
    viewDetails: 'https://www.naver.com/',
    isRequired: false,
  },
  {
    id: 'TERMS_MARKETING',
    isAgreed: false,
    label: '마케팅 수신 동의 (선택)',
    viewDetails: 'https://www.naver.com/',
    isRequired: false,
  },
];
const OWNER_AGREEMENT_INITIAL_ITEMS: AgreementItemType[] = [
  {
    id: 'TERMS_BIZ_REGISTRATION',
    isAgreed: false,
    label: '사업자 등록 및 서류 제출 관련 동의',
    viewDetails: 'https://www.naver.com/',
    isRequired: true,
  },
  {
    id: 'TERMS_TRADE_NOTICE',
    isAgreed: false,
    label: '거래 관련 고지 및 책임 약관',
    viewDetails: 'https://www.naver.com/',
    isRequired: true,
  },
  {
    id: 'TERMS_CONTENT_USAGE',
    isAgreed: false,
    label: '콘텐츠 사용 동의 및 푸드트럭 추천 동의(선택)',
    viewDetails: 'https://www.naver.com/',
    isRequired: false,
  },
];

export {
  type AgreementItemType,
  MEMBER_AGREEMENT_INITIAL_ITEMS,
  OWNER_AGREEMENT_INITIAL_ITEMS,
};
