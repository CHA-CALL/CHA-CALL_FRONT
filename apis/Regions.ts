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

import { GetRegionsData, SearchRegionsData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Regions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description depth, parentCode 를 기반으로 지역을 조회합니다.
   *
   * @tags Region API
   * @name GetRegions
   * @summary 지역 조회
   * @request GET:/regions
   * @secure
   * @response `200` `GetRegionsData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getRegions = (
    query: {
      /**
       * 행정 구역 깊이 (1: 시/도, 2: 시/군/구, 3: 동/읍/면)
       * @format int32
       * @min 1
       * @max 3
       * @example 1
       */
      depth: number;
      /**
       * 부모 행정동 코드 (depth=2/3일 때 필수)
       * @format int64
       * @example 11
       */
      parentCode?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetRegionsData, void>({
      path: `/regions`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 키워드를 부분문자열로 갖는 모든 지역을 검색합니다.
   *
   * @tags Region API
   * @name SearchRegions
   * @summary 지역 검색
   * @request GET:/regions/search
   * @secure
   * @response `200` `SearchRegionsData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  searchRegions = (
    query: {
      /**
       * 지역명 검색 키워드(부분일치, fullName 기준)
       * @minLength 1
       * @example "광"
       */
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchRegionsData, void>({
      path: `/regions/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
