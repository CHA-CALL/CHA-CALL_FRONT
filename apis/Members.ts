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
  GetMemberReservationDetailData,
  GetMemberReservationsData,
  GetReservationsForRatingData,
  GetSavedFoodTrucksData,
  RegisterRatingRequest,
  RegisterRatingsData,
  UpdateFoodTruckSaveStatusData,
  UpdateFoodTruckSaveStatusRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Members<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 지난 예약에 대한 푸드트럭 평점을 남깁니다.
   *
   * @tags Member API
   * @name RegisterRatings
   * @summary 평점 등록
   * @request POST:/members/me/ratings
   * @secure
   * @response `200` `RegisterRatingsData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  registerRatings = (data: RegisterRatingRequest, params: RequestParams = {}) =>
    this.request<RegisterRatingsData, void>({
      path: `/members/me/ratings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 푸드트럭 저장상태를 변경합니다. (저장/저장취소)
   *
   * @tags Member API
   * @name UpdateFoodTruckSaveStatus
   * @summary 푸드트럭 저장상태 변경
   * @request PATCH:/members/me/food-trucks/{foodTruckId}
   * @secure
   * @response `200` `UpdateFoodTruckSaveStatusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `409` `void`
   * @response `500` `void`
   */
  updateFoodTruckSaveStatus = (
    foodTruckId: number,
    data: UpdateFoodTruckSaveStatusRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateFoodTruckSaveStatusData, void>({
      path: `/members/me/food-trucks/${foodTruckId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 일반 유저의 예약 내역 목록을 조회합니다.
   *
   * @tags Member API
   * @name GetMemberReservations
   * @summary 일반 유저 예약 내역 목록 조회 (무한 스크롤)
   * @request GET:/members/me/reservations
   * @secure
   * @response `200` `GetMemberReservationsData` OK
   */
  getMemberReservations = (
    query: {
      /**
       * 조회할 예약 내역 타입
       * @example "예약 대기"
       */
      viewType: "진행 예정" | "확정 신청" | "완료 내역" | "취소 내역";
      /**
       * 마지막으로 조회된 데이터의 ID (다음 페이지 요청 시 사용)
       * @format int64
       * @example 120
       */
      "cursorPagingRequest.cursor"?: number;
      /**
       * 한 페이지에 조회할 개수
       * @format int32
       * @min 1
       * @default 20
       */
      "cursorPagingRequest.size"?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMemberReservationsData, any>({
      path: `/members/me/reservations`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 예약 ID로 예약 상세 정보를 조회합니다.
   *
   * @tags Member API
   * @name GetMemberReservationDetail
   * @summary 일반 유저 예약 상세 조회
   * @request GET:/members/me/reservations/{reservationId}
   * @secure
   * @response `200` `GetMemberReservationDetailData` OK
   */
  getMemberReservationDetail = (
    reservationId: number,
    params: RequestParams = {},
  ) =>
    this.request<GetMemberReservationDetailData, any>({
      path: `/members/me/reservations/${reservationId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 평점을 등록할 수 있는 지난 예약 목록을 조회합니다.
   *
   * @tags Member API
   * @name GetReservationsForRating
   * @summary 평점을 등록할 예약 조회
   * @request GET:/members/me/ratings/reservations
   * @secure
   * @response `200` `GetReservationsForRatingData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getReservationsForRating = (params: RequestParams = {}) =>
    this.request<GetReservationsForRatingData, void>({
      path: `/members/me/ratings/reservations`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 저장한 푸드트럭 목록을 조회합니다.
   *
   * @tags Member API
   * @name GetSavedFoodTrucks
   * @summary 저장한 푸드트럭 목록 조회
   * @request GET:/members/me/food-trucks
   * @secure
   * @response `200` `GetSavedFoodTrucksData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getSavedFoodTrucks = (
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
    params: RequestParams = {},
  ) =>
    this.request<GetSavedFoodTrucksData, void>({
      path: `/members/me/food-trucks`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
