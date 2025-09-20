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

import { AuthTokenRequest, GetTokenData } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description loginTokenKey를 통해 JWT Access Token을 발급받습니다. 카카오 소셜 로그인 직후 리다이렉트 url의 쿼리 파라미터에서 loginTokenKey를 꺼내서 요청해주세요.
   *
   * @tags Auth API
   * @name GetToken
   * @summary JWT Access Token 발급
   * @request POST:/auth/token
   * @secure
   * @response `200` `GetTokenData` OK
   * @response `400` `void`
   * @response `401` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getToken = (data: AuthTokenRequest, params: RequestParams = {}) =>
    this.request<GetTokenData, void>({
      path: `/auth/token`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
