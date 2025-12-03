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

import {
  CreateFoodTruckDocumentPresignedUrlsData,
  CreateNewFoodTruckData,
  DeleteBankAccountData,
  DeleteChatTemplateData,
  DeleteFoodTruckData,
  DeleteMenuData,
  FoodTruckCreateRequest,
  GetBankAccountData,
  GetChatTemplatesData,
  GetMenusData,
  GetMyFoodTrucksData,
  GetOwnerReservationsData,
  GetReservationDetailData,
  ImageRequest,
  RegisterBankAccountData,
  RegisterBankAccountRequest,
  RegisterChatTemplateData,
  RegisterChatTemplateRequest,
  RegisterMenuData,
  RegisterMenuRequest,
  UpdateBankAccountData,
  UpdateBankAccountRequest,
  UpdateChatTemplateData,
  UpdateChatTemplateRequest,
  UpdateFoodTruckViewedStatusData,
  UpdateFoodTruckViewedStatusRequest,
  UpdateMenuData,
  UpdateMenuRequest,
  UpdateMenuStatusData,
  UpdateMenuStatusRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Owners<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 사장님 - 푸드트럭 메뉴를 수정합니다.
   *
   * @tags Owner API
   * @name UpdateMenu
   * @summary 나의 푸드트럭 메뉴 수정
   * @request PUT:/owners/me/food-trucks/{foodTruckId}/menus/{menuId}
   * @secure
   * @response `200` `UpdateMenuData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateMenu = (
    foodTruckId: number,
    menuId: number,
    data: UpdateMenuRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateMenuData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭 메뉴를 삭제합니다.
   *
   * @tags Owner API
   * @name DeleteMenu
   * @summary 나의 푸드트럭 메뉴 삭제
   * @request DELETE:/owners/me/food-trucks/{foodTruckId}/menus/{menuId}
   * @secure
   * @response `200` `DeleteMenuData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  deleteMenu = (
    foodTruckId: number,
    menuId: number,
    params: RequestParams = {}
  ) =>
    this.request<DeleteMenuData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * @description 사장님이 자주 쓰는 채팅을 수정합니다.
   *
   * @tags Owner API
   * @name UpdateChatTemplate
   * @summary 자주 쓰는 채팅 수정
   * @request PUT:/owners/me/chat-templates/{chatTemplateId}
   * @secure
   * @response `200` `UpdateChatTemplateData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateChatTemplate = (
    chatTemplateId: number,
    data: UpdateChatTemplateRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateChatTemplateData, void>({
      path: `/owners/me/chat-templates/${chatTemplateId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님이 자주 쓰는 채팅을 삭제합니다.
   *
   * @tags Owner API
   * @name DeleteChatTemplate
   * @summary 자주 쓰는 채팅 삭제
   * @request DELETE:/owners/me/chat-templates/{chatTemplateId}
   * @secure
   * @response `200` `DeleteChatTemplateData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  deleteChatTemplate = (chatTemplateId: number, params: RequestParams = {}) =>
    this.request<DeleteChatTemplateData, void>({
      path: `/owners/me/chat-templates/${chatTemplateId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * @description 사장님이 자신의 은행 계좌를 수정합니다.
   *
   * @tags Owner API
   * @name UpdateBankAccount
   * @summary 은행 계좌 수정
   * @request PUT:/owners/me/bank-accounts/{bankAccountId}
   * @secure
   * @response `200` `UpdateBankAccountData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `409` `void`
   * @response `500` `void`
   */
  updateBankAccount = (
    bankAccountId: number,
    data: UpdateBankAccountRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateBankAccountData, void>({
      path: `/owners/me/bank-accounts/${bankAccountId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님이 자신의 은행 계좌를 삭제합니다.
   *
   * @tags Owner API
   * @name DeleteBankAccount
   * @summary 은행 계좌 삭제
   * @request DELETE:/owners/me/bank-accounts/{bankAccountId}
   * @secure
   * @response `200` `DeleteBankAccountData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `409` `void`
   * @response `500` `void`
   */
  deleteBankAccount = (bankAccountId: number, params: RequestParams = {}) =>
    this.request<DeleteBankAccountData, void>({
      path: `/owners/me/bank-accounts/${bankAccountId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * @description 푸드트럭을 최초로 등록하는 API 입니다.
   *
   * @tags Owner API
   * @name CreateNewFoodTruck
   * @summary 사장님 등록(서류 검증) & 푸드트럭 최초 등록
   * @request POST:/owners
   * @secure
   * @response `200` `CreateNewFoodTruckData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createNewFoodTruck = (
    data: FoodTruckCreateRequest,
    params: RequestParams = {}
  ) =>
    this.request<CreateNewFoodTruckData, void>({
      path: `/owners`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭 메뉴 목록을 조회합니다.
   *
   * @tags Owner API
   * @name GetMenus
   * @summary 나의 푸드트럭 메뉴 목록 조회
   * @request GET:/owners/me/food-trucks/{foodTruckId}/menus
   * @secure
   * @response `200` `GetMenusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getMenus = (
    foodTruckId: number,
    query?: {
      /**
       * 정렬 기준
       * @default "최신순"
       * @example "최신순"
       */
      sort?: '최신순' | '오래된순';
      /**
       * 마지막으로 조회된 데이터의 ID (다음 페이지 요청 시 사용)
       * @format int64
       * @example 120
       */
      'cursorPagingRequest.cursor'?: number;
      /**
       * 한 페이지에 조회할 개수
       * @format int32
       * @min 1
       * @default 20
       */
      'cursorPagingRequest.size'?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetMenusData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/menus`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭에 메뉴를 등록합니다.
   *
   * @tags Owner API
   * @name RegisterMenu
   * @summary 나의 푸드트럭 메뉴 등록
   * @request POST:/owners/me/food-trucks/{foodTruckId}/menus
   * @secure
   * @response `200` `RegisterMenuData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  registerMenu = (
    foodTruckId: number,
    data: RegisterMenuRequest,
    params: RequestParams = {}
  ) =>
    this.request<RegisterMenuData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/menus`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 푸드트럭 관련 서류 업로드를 위한 presigned URL을 발급받습니다.
   *
   * @tags Owner API
   * @name CreateFoodTruckDocumentPresignedUrls
   * @summary 푸드트럭 관련 서류 업로드를 위한 presigned URL 발급
   * @request POST:/owners/me/food-truck-documents/images
   * @secure
   * @response `200` `CreateFoodTruckDocumentPresignedUrlsData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createFoodTruckDocumentPresignedUrls = (
    data: ImageRequest,
    params: RequestParams = {}
  ) =>
    this.request<CreateFoodTruckDocumentPresignedUrlsData, void>({
      path: `/owners/me/food-truck-documents/images`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 푸드트럭 관련 서류 업로드를 위한 presigned URL을 발급받습니다.
   *
   * @tags Owner API
   * @name CreateFoodTruckDocumentPresignedUrls
   * @summary 푸드트럭 관련 서류 업로드를 위한 presigned URL 발급
   * @request POST:/owners/me/food-truck-documents/images
   * @secure
   * @response `200` `CreateFoodTruckDocumentPresignedUrlsData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createFoodTruckDocumentPresignedUrls = (
    data: ImageRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateFoodTruckDocumentPresignedUrlsData, void>({
      path: `/owners/me/food-truck-documents/images`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 푸드트럭 관련 서류 업로드를 위한 presigned URL을 발급받습니다.
   *
   * @tags Owner API
   * @name CreateFoodTruckDocumentPresignedUrls
   * @summary 푸드트럭 관련 서류 업로드를 위한 presigned URL 발급
   * @request POST:/owners/me/food-truck-documents/images
   * @secure
   * @response `200` `CreateFoodTruckDocumentPresignedUrlsData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createFoodTruckDocumentPresignedUrls = (
    data: ImageRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateFoodTruckDocumentPresignedUrlsData, void>({
      path: `/owners/me/food-truck-documents/images`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님이 자주 쓰는 채팅을 조회합니다.
   *
   * @tags Owner API
   * @name GetChatTemplates
   * @summary 자주 쓰는 채팅 조회
   * @request GET:/owners/me/chat-templates
   * @secure
   * @response `200` `GetChatTemplatesData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getChatTemplates = (params: RequestParams = {}) =>
    this.request<GetChatTemplatesData, void>({
      path: `/owners/me/chat-templates`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * @description 사장님이 자주 쓰는 채팅을 등록합니다.
   *
   * @tags Owner API
   * @name RegisterChatTemplate
   * @summary 자주 쓰는 채팅 등록
   * @request POST:/owners/me/chat-templates
   * @secure
   * @response `200` `RegisterChatTemplateData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  registerChatTemplate = (
    data: RegisterChatTemplateRequest,
    params: RequestParams = {}
  ) =>
    this.request<RegisterChatTemplateData, void>({
      path: `/owners/me/chat-templates`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님이 자신의 은행 계좌를 조회합니다.
   *
   * @tags Owner API
   * @name GetBankAccount
   * @summary 은행 계좌 조회
   * @request GET:/owners/me/bank-accounts
   * @secure
   * @response `200` `GetBankAccountData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getBankAccount = (params: RequestParams = {}) =>
    this.request<GetBankAccountData, void>({
      path: `/owners/me/bank-accounts`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * @description 사장님이 자신의 은행 계좌를 등록합니다.
   *
   * @tags Owner API
   * @name RegisterBankAccount
   * @summary 은행 계좌 등록
   * @request POST:/owners/me/bank-accounts
   * @secure
   * @response `200` `RegisterBankAccountData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `409` `void`
   * @response `500` `void`
   */
  registerBankAccount = (
    data: RegisterBankAccountRequest,
    params: RequestParams = {}
  ) =>
    this.request<RegisterBankAccountData, void>({
      path: `/owners/me/bank-accounts`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭 메뉴의 표시 상태를 변경합니다.
   *
   * @tags Owner API
   * @name UpdateMenuStatus
   * @summary 나의 푸드트럭 메뉴 표시 상태 변경
   * @request PATCH:/owners/me/food-trucks/{foodTruckId}/menus/{menuId}/change-status
   * @secure
   * @response `200` `UpdateMenuStatusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateMenuStatus = (
    foodTruckId: number,
    menuId: number,
    data: UpdateMenuStatusRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateMenuStatusData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}/change-status`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭의 표시 상태를 변경합니다.
   *
   * @tags Owner API
   * @name UpdateFoodTruckViewedStatus
   * @summary 나의 푸드트럭 표시 상태 변경
   * @request PATCH:/owners/me/food-trucks/{foodTruckId}/change-status
   * @secure
   * @response `200` `UpdateFoodTruckViewedStatusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateFoodTruckViewedStatus = (
    foodTruckId: number,
    data: UpdateFoodTruckViewedStatusRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateFoodTruckViewedStatusData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/change-status`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭의 표시 상태를 변경합니다.
   *
   * @tags Owner API
   * @name UpdateFoodTruckViewedStatus
   * @summary 나의 푸드트럭 표시 상태 변경
   * @request PATCH:/owners/me/food-trucks/{foodTruckId}/change-status
   * @secure
   * @response `200` `UpdateFoodTruckViewedStatusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateFoodTruckViewedStatus = (
    foodTruckId: number,
    data: UpdateFoodTruckViewedStatusRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateFoodTruckViewedStatusData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}/change-status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님의 예약 내역 목록을 조회합니다.
   *
   * @tags Owner API
   * @name GetOwnerReservations
   * @summary 사장님 예약 내역 목록 조회 (무한 스크롤)
   * @request GET:/owners/me/reservations
   * @secure
   * @response `200` `GetOwnerReservationsData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getOwnerReservations = (
    query: {
      /**
       * 조회할 예약 내역 타입
       * @example "예약 대기"
       */
      viewType: '진행 예정' | '확정 신청' | '완료 내역' | '취소 내역';
      /**
       * 마지막으로 조회된 데이터의 ID (다음 페이지 요청 시 사용)
       * @format int64
       * @example 120
       */
      'cursorPagingRequest.cursor'?: number;
      /**
       * 한 페이지에 조회할 개수
       * @format int32
       * @min 1
       * @default 20
       */
      'cursorPagingRequest.size'?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetOwnerReservationsData, void>({
      path: `/owners/me/reservations`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 예약 ID로 예약 상세 정보를 조회합니다.
   *
   * @tags Owner API
   * @name GetReservationDetail
   * @summary 사장님 예약 상세 조회
   * @request GET:/owners/me/reservations/{reservationId}
   * @secure
   * @response `200` `GetReservationDetailData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getReservationDetail = (reservationId: number, params: RequestParams = {}) =>
    this.request<GetReservationDetailData, void>({
      path: `/owners/me/reservations/${reservationId}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * @description 사장님 - 나의 푸드트럭 목록을 조회합니다.
   *
   * @tags Owner API
   * @name GetMyFoodTrucks
   * @summary 나의 푸드트럭 목록 조회 (무한 스크롤)
   * @request GET:/owners/me/food-trucks
   * @secure
   * @response `200` `GetMyFoodTrucksData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getMyFoodTrucks = (
    query?: {
      /**
       * 마지막으로 조회된 데이터의 ID (다음 페이지 요청 시 사용)
       * @format int64
       * @example 120
       */
      cursor?: number;
      /**
       * 한 페이지에 조회할 개수
       * @format int32
       * @min 1
       * @default 20
       */
      size?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetMyFoodTrucksData, void>({
      path: `/owners/me/food-trucks`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 사장님 - 푸드트럭을 삭제합니다.
   *
   * @tags Owner API
   * @name DeleteFoodTruck
   * @summary 나의 푸드트럭 삭제
   * @request DELETE:/owners/me/food-trucks/{foodTruckId}
   * @secure
   * @response `200` `DeleteFoodTruckData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  deleteFoodTruck = (foodTruckId: number, params: RequestParams = {}) =>
    this.request<DeleteFoodTruckData, void>({
      path: `/owners/me/food-trucks/${foodTruckId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
