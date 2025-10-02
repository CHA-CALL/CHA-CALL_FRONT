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
  CreateReservationData,
  CreateReservationRequest,
  GetReservationData,
  GetReservationStatusData,
  UpdateReservationData,
  UpdateReservationRequest,
  UpdateReservationStatusData,
  UpdateReservationStatusRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Reservations<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 사장님이 작성한 예약 견적서를 조회합니다. 사장님, 일반 유저 모두 조회 가능합니다.
   *
   * @tags Reservation API
   * @name GetReservation
   * @summary 예약 견적서 조회
   * @request GET:/reservations/{reservationId}
   * @secure
   * @response `200` `GetReservationData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getReservation = (reservationId: number, params: RequestParams = {}) =>
    this.request<GetReservationData, void>({
      path: `/reservations/${reservationId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사장님이 작성한 예약 견적서를 수정합니다. 사장님, 일반 유저 모두 수정 가능합니다.
   *
   * @tags Reservation API
   * @name UpdateReservation
   * @summary 예약 견적서 수정
   * @request PUT:/reservations/{reservationId}
   * @secure
   * @response `200` `UpdateReservationData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateReservation = (
    reservationId: number,
    data: UpdateReservationRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateReservationData, void>({
      path: `/reservations/${reservationId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사장님이 예약 견적서를 작성합니다. 예약 견적서 정보에 따라 예약이 생성됩니다. (예약 상태: 예약 대기)
   *
   * @tags Reservation API
   * @name CreateReservation
   * @summary 예약 견적서 작성 (예약 생성)
   * @request POST:/reservations
   * @secure
   * @response `200` `CreateReservationData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createReservation = (
    data: CreateReservationRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateReservationData, void>({
      path: `/reservations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 예약 ID로 예약 상태를 조회합니다.
   *
   * @tags Reservation API
   * @name GetReservationStatus
   * @summary 예약 상태 조회
   * @request GET:/reservations/{reservationId}/status
   * @secure
   * @response `200` `GetReservationStatusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getReservationStatus = (reservationId: number, params: RequestParams = {}) =>
    this.request<GetReservationStatusData, void>({
      path: `/reservations/${reservationId}/status`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 요청에 따라 예약 상태를 변경합니다.예약 상태 변경 순서: 예약 대기 -> 예약 확정 요청 -> 예약 확정 -> 예약 취소 요청 -> 예약 취소
   *
   * @tags Reservation API
   * @name UpdateReservationStatus
   * @summary 예약 상태 변경
   * @request PATCH:/reservations/{reservationId}/status
   * @secure
   * @response `200` `UpdateReservationStatusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateReservationStatus = (
    reservationId: number,
    data: UpdateReservationStatusRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateReservationStatusData, void>({
      path: `/reservations/${reservationId}/status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
