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
  ApproveFoodTruckStatusData,
  ApproveFoodTruckStatusRequest,
  GetUserInfoData,
  UpdateUserInfoData,
  UpdateUserInfoRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 사용자(고객)의 정보를 조회합니다. (사장님, 일반유저 무관)
   *
   * @tags User API
   * @name GetUserInfo
   * @summary [마이페이지] 회원 정보 조회
   * @request GET:/users/me
   * @secure
   * @response `200` `GetUserInfoData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getUserInfo = (params: RequestParams = {}) =>
    this.request<GetUserInfoData, void>({
      path: `/users/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자(고객)의 정보를 수정합니다. (사장님, 일반유저 무관)
   *
   * @tags User API
   * @name UpdateUserInfo
   * @summary [마이페이지] 회원 정보 수정
   * @request PUT:/users/me
   * @secure
   * @response `200` `UpdateUserInfoData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateUserInfo = (data: UpdateUserInfoRequest, params: RequestParams = {}) =>
    this.request<UpdateUserInfoData, void>({
      path: `/users/me`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 운영자 - 푸드트럭 승인 상태를 변경합니다.
   *
   * @tags User API
   * @name ApproveFoodTruckStatus
   * @summary 푸드트럭 승인 상태 변경
   * @request PATCH:/users/admin/food-trucks/{foodTruckId}/approval
   * @secure
   * @response `200` `ApproveFoodTruckStatusData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  approveFoodTruckStatus = (
    foodTruckId: number,
    data: ApproveFoodTruckStatusRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApproveFoodTruckStatusData, void>({
      path: `/users/admin/food-trucks/${foodTruckId}/approval`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
