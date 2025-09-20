/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 사용자 정보 수정 요청 DTO */
export interface UpdateUserInfoRequest {
  /**
   * 프로필 이미지 URL
   * @minLength 1
   * @example "https://example.com/profile.jpg"
   */
  profileImageUrl: string;
  /**
   * 사용자 이름
   * @minLength 1
   * @example "홍길동"
   */
  name: string;
  /**
   * 사용자 이메일
   * @minLength 1
   * @example "chacall@kokuk.ac.kr"
   */
  email: string;
  /**
   * 사용자 성별
   * @minLength 1
   * @example "남성"
   */
  gender: string;
  /**
   * 약관 동의 여부
   * @example true
   */
  termAgreed: boolean;
}

export interface BaseResponseVoid {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: any;
}

export interface UpdateReservationRequest {
  /**
   * 예약 주소 (시/구/동)
   * @minLength 1
   * @example "서울시 강남구 역삼동"
   */
  address: string;
  /**
   * 예약 상세 주소
   * @minLength 1
   * @example "역삼로 123"
   */
  detailAddress: string;
  /**
   * 예약 날짜 (최소 1개, 최대 2개) (형식: YYYY.MM.DD ~ YYYY.MM.DD)
   * @maxItems 2
   * @minItems 1
   * @example ["2025.09.20 ~ 2025.09.20","2025.09.25 ~ 2025.09.25"]
   */
  reservationDates: string[];
  /**
   * 운영 시간 (형식: HH:MM ~ HH:MM)
   * @minLength 1
   * @pattern ^([01]\d|2[0-3]):([0-5]\d) ~ ([01]\d|2[0-3]):([0-5]\d)$
   * @example "15:00 ~ 16:00"
   */
  operationHour: string;
  /**
   * 메뉴
   * @minLength 1
   * @example "떡볶이, 순대, 튀김"
   */
  menu: string;
  /**
   * 예약금 (0 이상)
   * @format int32
   * @example 50000
   */
  deposit: number;
  /**
   * 전기 사용 여부
   * @example true
   */
  isUseElectricity: boolean;
  /**
   * 기타 요청 사항
   * @example "주차 공간이 넓었으면 좋겠습니다."
   */
  etcRequest?: string;
}

export interface BaseResponseReservationIdResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: ReservationIdResponse;
}

export interface ReservationIdResponse {
  /**
   * 생성된 예약 ID
   * @format int64
   * @example 1
   */
  reservationId?: number;
}

export interface UpdateChatTemplateRequest {
  /**
   * 자주 쓰는 채팅 내용
   * @minLength 0
   * @maxLength 500
   * @example "저희집은 마라탕이 맛납니다"
   */
  content: string;
}

/** 은행 계좌 수정 요청 DTO */
export interface UpdateBankAccountRequest {
  /**
   * 은행명
   * @minLength 1
   * @example "국민은행"
   */
  bankName: string;
  /**
   * 예금주명
   * @minLength 1
   * @example "홍길동"
   */
  accountHolderName: string;
  /**
   * 계좌번호
   * @minLength 1
   * @example "123-456-78901234"
   */
  accountNumber: string;
}

export interface CreateReservationRequest {
  /**
   * 푸드트럭 ID
   * @format int64
   * @example 1
   */
  foodTruckId: number;
  /**
   * 예약자(일반 유저) ID
   * @format int64
   * @example 2
   */
  reservationUserId: number;
  /**
   * 예약 주소 (시/구/동)
   * @minLength 1
   * @example "서울시 강남구 역삼동"
   */
  address: string;
  /**
   * 예약 상세 주소
   * @minLength 1
   * @example "역삼로 123"
   */
  detailAddress: string;
  /**
   * 예약 날짜 (최소 1개, 최대 2개) (형식: YYYY.MM.DD ~ YYYY.MM.DD)
   * @maxItems 2
   * @minItems 1
   * @example ["2025.09.20 ~ 2025.09.20","2025.09.25 ~ 2025.09.25"]
   */
  reservationDates: string[];
  /**
   * 운영 시간 (형식: HH:MM ~ HH:MM)
   * @minLength 1
   * @pattern ^([01]\d|2[0-3]):([0-5]\d) ~ ([01]\d|2[0-3]):([0-5]\d)$
   * @example "15:00 ~ 16:00"
   */
  operationHour: string;
  /**
   * 메뉴
   * @minLength 1
   * @example "떡볶이, 순대, 튀김"
   */
  menu: string;
  /**
   * 예약금 (0 이상)
   * @format int32
   * @example 50000
   */
  deposit: number;
  /**
   * 전기 사용 여부
   * @example true
   */
  isUseElectricity: boolean;
  /**
   * 기타 요청 사항
   * @example "주차 공간이 넓었으면 좋겠습니다."
   */
  etcRequest?: string;
}

export interface RegisterChatTemplateRequest {
  /**
   * 자주 쓰는 채팅 내용
   * @minLength 0
   * @maxLength 500
   * @example "안녕하세요. 차콜 푸드트럭입니다!"
   */
  content: string;
}

/** 은행 계좌 등록 요청 DTO */
export interface RegisterBankAccountRequest {
  /**
   * 은행명
   * @minLength 1
   * @example "국민은행"
   */
  bankName: string;
  /**
   * 예금주명
   * @minLength 1
   * @example "홍길동"
   */
  accountHolderName: string;
  /**
   * 계좌번호
   * @minLength 1
   * @example "123-456-78901234"
   */
  accountNumber: string;
}

/** 평점 등록 요청 DTO */
export interface RegisterRatingRequest {
  /**
   * 예약 ID
   * @format int64
   * @example 1
   */
  reservationId: number;
  /**
   * 푸드트럭 ID
   * @format int64
   * @example 1
   */
  foodTruckId: number;
  /**
   * 평점 (0~5 범위 내에 0.5 단위)
   * @pattern ^(?:[0-4](?:\.0|\.5)|5(?:\.0)?)$
   * @example 4.5
   */
  rating: string;
}

export interface AuthTokenRequest {
  /** @minLength 1 */
  loginTokenKey: string;
}

export interface AuthTokenResponse {
  token?: string;
}

export interface BaseResponseAuthTokenResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: AuthTokenResponse;
}

/** 푸드트럭 저장 상태 변경 요청 */
export interface UpdateFoodTruckSaveStatusRequest {
  /**
   * 푸드트럭 저장 요청 여부, (true: 저장 / false: 저장 취소)
   * @example true
   */
  isSavedRequest: boolean;
}

export interface BaseResponseSavedFoodTruckStatusResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: SavedFoodTruckStatusResponse;
}

export interface SavedFoodTruckStatusResponse {
  isSaved?: boolean;
}

export interface BaseResponseUserResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: UserResponse;
}

export interface UserResponse {
  /**
   * 프로필 이미지 URL
   * @example "http://image.png"
   */
  profileImageUrl?: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 이메일
   * @example "email@email.com"
   */
  email?: string;
  /**
   * 성별
   * @example "남성"
   */
  gender?: string;
  /**
   * 약관 동의 여부
   * @example true
   */
  termAgreed?: boolean;
}

export interface BaseResponseReservationResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: ReservationResponse;
}

export interface ReservationResponse {
  /**
   * 예약 주소 (시/구/동)
   * @example "서울시 강남구 역삼동"
   */
  address?: string;
  /**
   * 예약 상세 주소
   * @example "역삼로 123"
   */
  detailAddress?: string;
  /**
   * 예약 날짜 (형식: YYYY.MM.DD ~ YYYY.MM.DD)
   * @example ["2025.09.20 ~ 2025.09.20","2025.09.25 ~ 2025.09.25"]
   */
  reservationDates?: string[];
  /**
   * 운영 시간 (형식: HH:MM ~ HH:MM)
   * @example "15:00 ~ 16:00"
   */
  operationHour?: string;
  /**
   * 메뉴
   * @example "떡볶이, 순대, 튀김"
   */
  menu?: string;
  /**
   * 예약금 (0 이상)
   * @format int32
   * @example 50000
   */
  deposit?: number;
  /**
   * 전기 사용 여부
   * @example true
   */
  isUseElectricity?: boolean;
  /**
   * 기타 요청 사항
   * @example "주차 공간이 넓었으면 좋겠습니다."
   */
  etcRequest?: string;
}

export interface BaseResponseListRegionResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: RegionResponse[];
}

export interface RegionResponse {
  /**
   * 지역 이름
   * @example "서울"
   */
  name?: string;
  /**
   * 지역 행정동 코드
   * @format int64
   * @example 11
   */
  code?: number;
}

export interface BaseResponseCursorPagingResponseOwnerReservationHistoryResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: CursorPagingResponseOwnerReservationHistoryResponse;
}

export interface CursorPagingResponseOwnerReservationHistoryResponse {
  content?: OwnerReservationHistoryResponse[];
  /** @format int64 */
  lastCursor?: number;
  hasNext?: boolean;
}

export interface OwnerReservationHistoryResponse {
  /**
   * 예약 내역 식별자
   * @format int64
   * @example 1
   */
  reservationId?: number;
  /**
   * 유저(고객) 프로필 이미지
   * @example "http://image.png"
   */
  profileImage?: string;
  /**
   * 유저(고객) 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 예약 주소
   * @example "서울 광진구 화양동"
   */
  address?: string;
  /**
   * 예약 날짜 및 운영 시간 정보 리스트 (최대 2개)
   * @example ["2025-09-20 13시~19시","2025-09-21 13시~19시"]
   */
  dateTimeInfos?: string[];
  /**
   * 푸드트럭 이름
   * @example "차콜 푸드트럭"
   */
  foodTruckName?: string;
}

export interface BaseResponseOwnerReservationDetailResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: OwnerReservationDetailResponse;
}

export interface OwnerReservationDetailResponse {
  /**
   * 상대방(손님)의 프로필 이미지 URL
   * @example "https://image.url/path/profile.jpg"
   */
  profileImage?: string;
  /**
   * 상대방의 이름 또는 닉네임
   * @example "김차콜"
   */
  name?: string;
  /**
   * 예약 주소
   * @example "서울 광진구 화양동 123-45"
   */
  address?: string;
  /**
   * 예약 날짜 및 운영 시간 정보 리스트 (최대 2개)
   * @example ["2025-09-20 13시~19시","2025-09-21 13시~19시"]
   */
  dateTimeInfos?: string[];
  /**
   * 견적서 PDF 다운로드 URL (null 일 수 있음)
   * @example "https://storage.url/quotes/reservation_123.pdf"
   */
  pdfUrl?: string;
  /**
   * 운영 메뉴
   * @example "핫도그, 국밥, 짜장면"
   */
  menu?: string;
  /**
   * 지불된 예약금액
   * @example "50000원"
   */
  deposit?: string;
  /**
   * 전기 사용 가능 여부
   * @example "가능"
   */
  electricityInfo?: string;
  /**
   * 기타 요청 사항 (null 일 수 있음)
   * @example "음식을 많이 주세요, 늦지말아주세요"
   */
  etcRequest?: string;
}

export interface BaseResponseCursorPagingResponseMyFoodTruckResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: CursorPagingResponseMyFoodTruckResponse;
}

export interface CursorPagingResponseMyFoodTruckResponse {
  content?: MyFoodTruckResponse[];
  /** @format int64 */
  lastCursor?: number;
  hasNext?: boolean;
}

export interface MyFoodTruckResponse {
  /**
   * 푸드트럭 식별자
   * @format int64
   * @example 1
   */
  foodTruckId?: number;
  /**
   * 푸드트럭 이미지
   * @example "image.png"
   */
  imageUrl?: string;
  /**
   * 푸드트럭 이름
   * @example "차콜 푸드트럭"
   */
  name?: string;
  /**
   * 푸드트럭 설명
   * @example "저희 푸드트럭은 10년간 이어져온..."
   */
  description?: string;
  /**
   * 운영 가능 시간대
   * @example "09:00 ~ 21:00"
   */
  activeTime?: string;
  /**
   * 호출 가능 지역
   * @example "서울 전체, 경기도 수원시 영통구, 인천 계양구"
   */
  serviceArea?: string;
}

export interface BaseResponseListChatTemplateResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: ChatTemplateResponse[];
}

export interface ChatTemplateResponse {
  /**
   * 자주 쓰는 채팅 식별자
   * @format int64
   * @example 1
   */
  chatTemplateId?: number;
  /**
   * 자주 쓰는 채팅 내용
   * @example "안녕하세요. 차콜 푸드트럭입니다!"
   */
  content?: string;
}

export interface BankAccountResponse {
  /**
   * 계좌 식별자
   * @format int64
   * @example 1
   */
  bankAccountId?: number;
  /**
   * 은행명
   * @example "기업은행"
   */
  bankName?: string;
  /**
   * 예금주명
   * @example "홍길동"
   */
  accountHolderName?: string;
  /**
   * 계좌번호
   * @example "110-1123-123124"
   */
  accountNumber?: string;
}

export interface BaseResponseBankAccountResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: BankAccountResponse;
}

export interface BaseResponseCursorPagingResponseMemberReservationHistoryResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: CursorPagingResponseMemberReservationHistoryResponse;
}

export interface CursorPagingResponseMemberReservationHistoryResponse {
  content?: MemberReservationHistoryResponse[];
  /** @format int64 */
  lastCursor?: number;
  hasNext?: boolean;
}

export interface MemberReservationHistoryResponse {
  /**
   * 예약 내역 식별자
   * @format int64
   * @example 1
   */
  reservationId?: number;
  /**
   * 푸드트럭 대표 사진 URL
   * @example "https://example.com/foodtruck.jpg"
   */
  photoUrl?: string;
  /**
   * 푸드트럭 이름
   * @example "맛있는 푸드트럭"
   */
  name?: string;
  /**
   * 예약 주소
   * @example "서울 광진구 화양동"
   */
  address?: string;
  /**
   * 예약 날짜 및 운영 시간 정보 리스트 (최대 2개)
   * @example ["2025-09-20 13시~19시","2025-09-21 13시~19시"]
   */
  dateTimeInfos?: string[];
}

export interface BaseResponseMemberReservationDetailResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: MemberReservationDetailResponse;
}

export interface MemberReservationDetailResponse {
  /**
   * 푸드트럭의 대표 사진 URL
   * @example "https://example.com/foodtruck.jpg"
   */
  photoUrl?: string;
  /**
   * 푸드트럭 이름
   * @example "맛있는 푸드트럭"
   */
  name?: string;
  /**
   * 예약 주소
   * @example "서울 광진구 화양동 123-45"
   */
  address?: string;
  /**
   * 예약 날짜 및 운영 시간 정보 리스트 (최대 2개)
   * @example ["2025-09-20 13시~19시","2025-09-21 13시~19시"]
   */
  dateTimeInfos?: string[];
  /**
   * 견적서 PDF 다운로드 URL (null 일 수 있음)
   * @example "https://storage.url/quotes/reservation_123.pdf"
   */
  pdfUrl?: string;
  /**
   * 운영 메뉴
   * @example "핫도그, 국밥, 짜장면"
   */
  menu?: string;
  /**
   * 지불된 예약금액
   * @example "50000원"
   */
  deposit?: string;
  /**
   * 전기 사용 가능 여부
   * @example "가능"
   */
  electricityInfo?: string;
  /**
   * 기타 요청 사항 (null 일 수 있음)
   * @example "음식을 많이 주세요, 늦지말아주세요"
   */
  etcRequest?: string;
}

export interface BaseResponseReservationForRatingResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: ReservationForRatingResponse;
}

export interface ReservationForRating {
  /**
   * 예약 식별자
   * @format int64
   * @example 1
   */
  reservationId?: number;
  /**
   * 푸드트럭 식별자
   * @format int64
   * @example 1
   */
  foodTruckId?: number;
  /**
   * 푸드트럭 이름
   * @example "푸드트럭"
   */
  name?: string;
  /**
   * 푸드트럭 대표 사진 URL
   * @example "http://image.png"
   */
  photoUrl?: string;
  /**
   * 예약 주소
   * @example "서울 광진구 화양동"
   */
  address?: string;
  /**
   * 예약 날짜 및 운영 시간 정보 리스트 (최대 2개)
   * @example ["2025-09-20 13시~19시","2025-09-21 13시~19시"]
   */
  dateTimeInfos?: string[];
}

export interface ReservationForRatingResponse {
  /** 평점 등록이 필요한 예약 리스트 */
  reservations?: ReservationForRating[];
}

export interface BaseResponseCursorPagingResponseSavedFoodTruckResponse {
  isSuccess?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: CursorPagingResponseSavedFoodTruckResponse;
}

export interface CursorPagingResponseSavedFoodTruckResponse {
  content?: SavedFoodTruckResponse[];
  /** @format int64 */
  lastCursor?: number;
  hasNext?: boolean;
}

export interface SavedFoodTruckResponse {
  /**
   * 푸드트럭 식별자
   * @format int64
   * @example 1
   */
  foodTruckId?: number;
  /**
   * 푸드트럭 이름
   * @example "푸드트럭"
   */
  name?: string;
  /**
   * 푸드트럭 대표 사진 URL
   * @example "http://image.png"
   */
  photoUrl?: string;
  /**
   * 푸드트럭 설명
   * @example "맛있는 푸드트럭입니다."
   */
  description?: string;
  /**
   * 푸드트럭 평균 평점
   * @format double
   * @example 4.5
   */
  averageRating?: number;
  /**
   * 푸드트럭 평점 수
   * @format int32
   * @example 100
   */
  ratingCount?: number;
}

export type GetUserInfoData = BaseResponseUserResponse;

export type UpdateUserInfoData = BaseResponseVoid;

export type GetReservationData = BaseResponseReservationResponse;

export type UpdateReservationData = BaseResponseReservationIdResponse;

export type UpdateChatTemplateData = BaseResponseVoid;

export type DeleteChatTemplateData = BaseResponseVoid;

export type UpdateBankAccountData = BaseResponseVoid;

export type DeleteBankAccountData = BaseResponseVoid;

export type CreateReservationData = BaseResponseReservationIdResponse;

export type GetChatTemplatesData = BaseResponseListChatTemplateResponse;

export type RegisterChatTemplateData = BaseResponseVoid;

export type GetBankAccountData = BaseResponseBankAccountResponse;

export type RegisterBankAccountData = BaseResponseVoid;

export type RegisterRatingsData = BaseResponseVoid;

export type GetTokenData = BaseResponseAuthTokenResponse;

export type UpdateFoodTruckSaveStatusData =
  BaseResponseSavedFoodTruckStatusResponse;

export type GetRegionsData = BaseResponseListRegionResponse;

export type SearchRegionsData = BaseResponseListRegionResponse;

export type GetOwnerReservationsData =
  BaseResponseCursorPagingResponseOwnerReservationHistoryResponse;

export type GetReservationDetailData =
  BaseResponseOwnerReservationDetailResponse;

export type GetMyFoodTrucksData =
  BaseResponseCursorPagingResponseMyFoodTruckResponse;

export type GetMemberReservationsData =
  BaseResponseCursorPagingResponseMemberReservationHistoryResponse;

export type GetMemberReservationDetailData =
  BaseResponseMemberReservationDetailResponse;

export type GetReservationsForRatingData =
  BaseResponseReservationForRatingResponse;

export type GetSavedFoodTrucksData =
  BaseResponseCursorPagingResponseSavedFoodTruckResponse;

export type DeleteFoodTruckData = BaseResponseVoid;
