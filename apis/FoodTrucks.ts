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
  CreateFoodTruckImagePresignedUrlData,
  CreateMenuImagePresignedUrlData,
  DeleteFoodTruckImagesFromS3Data,
  DeleteFoodTruckImagesRequest,
  FoodTruckNameDuplicateCheckRequest,
  GetFoodTruckDetailsData,
  GetFoodTruckMenusData,
  GetFoodTrucksData,
  GetTopRatedFoodTrucksData,
  ImageRequest,
  IsNameDuplicatedData,
  SearchFoodTruckMenusData,
  UpdateFoodTruckInfoRequest,
  UpdateMyFoodTruckInfoData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class FoodTrucks<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 푸드트럭의 상세 정보를 조회합니다.
   *
   * @tags FoodTruck API
   * @name GetFoodTruckDetails
   * @summary 푸드트럭 상세조회
   * @request GET:/food-trucks/{foodTruckId}
   * @secure
   * @response `200` `GetFoodTruckDetailsData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getFoodTruckDetails = (foodTruckId: number, params: RequestParams = {}) =>
    this.request<GetFoodTruckDetailsData, void>({
      path: `/food-trucks/${foodTruckId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 승인이 완료된 나의 푸드트럭 정보를 기입하거나 수정합니다.
   *
   * @tags FoodTruck API
   * @name UpdateMyFoodTruckInfo
   * @summary 나의 푸드트럭 정보 등록/수정
   * @request PUT:/food-trucks/{foodTruckId}
   * @secure
   * @response `200` `UpdateMyFoodTruckInfoData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  updateMyFoodTruckInfo = (
    foodTruckId: number,
    data: UpdateFoodTruckInfoRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateMyFoodTruckInfoData, void>({
      path: `/food-trucks/${foodTruckId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴 사진을 업로드하기 위한 presigned URL을 발급받습니다.
   *
   * @tags FoodTruck API
   * @name CreateMenuImagePresignedUrl
   * @summary 메뉴 이미지 presigned URL 발급
   * @request POST:/food-trucks/menus/images
   * @secure
   * @response `200` `CreateMenuImagePresignedUrlData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createMenuImagePresignedUrl = (
    data: ImageRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateMenuImagePresignedUrlData, void>({
      path: `/food-trucks/menus/images`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 푸드트럭 사진을 업로드하기 위한 presigned URL을 발급받습니다.
   *
   * @tags FoodTruck API
   * @name CreateFoodTruckImagePresignedUrl
   * @summary 푸드트럭 이미지 presigned URL 발급
   * @request POST:/food-trucks/images
   * @secure
   * @response `200` `CreateFoodTruckImagePresignedUrlData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  createFoodTruckImagePresignedUrl = (
    data: ImageRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateFoodTruckImagePresignedUrlData, void>({
      path: `/food-trucks/images`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 푸드트럭 이름 중복 여부를 체크합니다.
   *
   * @tags FoodTruck API
   * @name IsNameDuplicated
   * @summary 푸드트럭 이름 중복 체크
   * @request POST:/food-trucks/duplicate-check
   * @secure
   * @response `200` `IsNameDuplicatedData` OK
   * @response `400` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  isNameDuplicated = (
    data: FoodTruckNameDuplicateCheckRequest,
    params: RequestParams = {},
  ) =>
    this.request<IsNameDuplicatedData, void>({
      path: `/food-trucks/duplicate-check`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
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
        | "200인분 미만"
        | "200인분 이상"
        | "논의 필요";
      /**
       * 음식 종류(여러 개 OR, CSV). 예) 분식,한식  / 허용값: 식사,도시락,퓨전식,분식,양식,중식,한식,간식,디저트,음료,커피,미정
       * @example "분식,한식"
       */
      categories?: string;
      /**
       * 전기 사용
       * @example "논의 필요"
       */
      needElectricity?: "필요" | "불필요" | "논의 필요";
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
  /**
   * @description 푸드트럭 메뉴 목록을 조회합니다.
   *
   * @tags FoodTruck API
   * @name GetFoodTruckMenus
   * @summary 푸드트럭 메뉴 목록 조회
   * @request GET:/food-trucks/{foodTruckId}/menus
   * @secure
   * @response `200` `GetFoodTruckMenusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getFoodTruckMenus = (
    foodTruckId: number,
    query?: {
      /**
       * 정렬 기준
       * @default "최신순"
       * @example "최신순"
       */
      sort?: "최신순" | "오래된순";
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
    this.request<GetFoodTruckMenusData, void>({
      path: `/food-trucks/${foodTruckId}/menus`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 푸드트럭 메뉴를 이름으로 검색합니다.
   *
   * @tags FoodTruck API
   * @name SearchFoodTruckMenus
   * @summary 푸드트럭 메뉴 검색
   * @request GET:/food-trucks/{foodTruckId}/menus/search
   * @secure
   * @response `200` `SearchFoodTruckMenusData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  searchFoodTruckMenus = (
    foodTruckId: number,
    query: {
      /**
       * 검색 키워드
       * @example "치킨"
       */
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchFoodTruckMenusData, void>({
      path: `/food-trucks/${foodTruckId}/menus/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 평점이 높은 푸드트럭을 조회합니다.
   *
   * @tags FoodTruck API
   * @name GetTopRatedFoodTrucks
   * @summary [홈화면용] 평점 높은 푸드트럭 조회
   * @request GET:/food-trucks/top-rated
   * @secure
   * @response `200` `GetTopRatedFoodTrucksData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getTopRatedFoodTrucks = (params: RequestParams = {}) =>
    this.request<GetTopRatedFoodTrucksData, void>({
      path: `/food-trucks/top-rated`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description S3에서 푸드트럭/메뉴 이미지 객체를 삭제합니다. 사용자가 기존 푸드트럭/메뉴 이미지를 삭제했을 경우 호출해주세요.
   *
   * @tags FoodTruck API
   * @name DeleteFoodTruckImagesFromS3
   * @summary S3에서 푸드트럭 이미지 객체 삭제
   * @request DELETE:/food-trucks/{foodTruckId}/images
   * @secure
   * @response `200` `DeleteFoodTruckImagesFromS3Data` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  deleteFoodTruckImagesFromS3 = (
    foodTruckId: number,
    data: DeleteFoodTruckImagesRequest,
    params: RequestParams = {},
  ) =>
    this.request<DeleteFoodTruckImagesFromS3Data, void>({
      path: `/food-trucks/${foodTruckId}/images`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
