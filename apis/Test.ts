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

import { GetToken1Data } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Test<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags test-controller
   * @name GetToken1
   * @request GET:/test/token
   * @secure
   * @response `200` `GetToken1Data` OK
   */
  getToken1 = (
    query: {
      /** @format int64 */
      userId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetToken1Data, any>({
      path: `/test/token`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
