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

import { GetFoodTrucksData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class FoodTrucks<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 필터링 조건을 기반으로 푸드트럭을 조회합니다.
   *
   * @tags FoodTruck API
   * @name GetFoodTrucks
   * @summary 푸드트럭 조회
   * @request GET:/food-trucks
   * @secure
   * @response `200` `GetFoodTrucksData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getFoodTrucks = (
    query?: {
      /**
       * 검색어(이름/설명 LIKE)
       * @example "디저트"
       */
      keyword?: string;
      /**
       * 지역 코드들 (prefix 검색, 여러 개 OR). 콤마로 구분
       * @example "11680,41"
       */
      regionCodes?: string;
      /**
       * 운영 가능 기간들(여러 개 OR). 형식: yyyy.MM.dd~yyyy.MM.dd 를 콤마로 구분
       * @example "2025.09.10~2025.09.11,2025.10.11~2025.10.31"
       */
      schedules?: string;
      /**
       * 수량 기준
       * @example "150인분 미만"
       */
      availableQuantity?:
        | "50인분 미만"
        | "100인분 미만"
        | "150인분 미만"
        | "200인분 이상"
        | "논의 필요";
      /**
       * 음식 종류(여러 개 OR, CSV). 예) 분식,한식  / 허용값: 한식, 중식, 일식, 양식, 분식, 카페/디저트, 기타
       * @example "분식,한식"
       */
      categories?: string;
      /**
       * 전기 사용
       * @example "논의 필요"
       */
      needElectricity?: "가능" | "불가능" | "논의 필요";
      /**
       * 결제 방법(무관을 선택하면 필터 미적용)
       * @example "무관"
       */
      paymentMethod?: "무관" | "계좌이체" | "카드";
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
    this.request<GetFoodTrucksData, void>({
      path: `/food-trucks`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
