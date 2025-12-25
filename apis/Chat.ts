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
  CreateChatRoomData,
  CreateChatRoomRequest,
  GetChatMessagesData,
  GetChatRoomMetaDataData,
  GetChatRoomsData,
  MarkMessagesAsReadData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Chat<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 사용자가 속한 채팅방 목록을 조회합니다.
   *
   * @tags Chat API
   * @name GetChatRooms
   * @summary 채팅방 목록 조회
   * @request GET:/chat/rooms
   * @secure
   * @response `200` `GetChatRoomsData` OK
   */
  getChatRooms = (
    query: {
      /**
       * 현재 채팅방 기준 푸드트럭 사장인지 여부
       * @example false
       */
      isOwner: boolean;
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
    this.request<GetChatRoomsData, any>({
      path: `/chat/rooms`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 예약자와 사장님간의 채팅방을 생성합니다.
   *
   * @tags Chat API
   * @name CreateChatRoom
   * @summary 채팅방 생성 (채팅 시작)
   * @request POST:/chat/rooms
   * @secure
   * @response `200` `CreateChatRoomData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `409` `void`
   * @response `500` `void`
   */
  createChatRoom = (data: CreateChatRoomRequest, params: RequestParams = {}) =>
    this.request<CreateChatRoomData, void>({
      path: `/chat/rooms`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Chat API
   * @name MarkMessagesAsRead
   * @summary 채팅방 내 메시지 읽음 처리
   * @request PATCH:/chat/rooms/{roomId}/read
   * @secure
   * @response `200` `MarkMessagesAsReadData` OK
   */
  markMessagesAsRead = (roomId: number, params: RequestParams = {}) =>
    this.request<MarkMessagesAsReadData, any>({
      path: `/chat/rooms/${roomId}/read`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description 채팅 상단에 표시되는 채팅 상대의 이름과 관련된 예약 ID(있는 경우)를 조회합니다.
   *
   * @tags Chat API
   * @name GetChatRoomMetaData
   * @summary 채팅방 메타데이터 조회
   * @request GET:/chat/rooms/{roomId}
   * @secure
   * @response `200` `GetChatRoomMetaDataData` OK
   * @response `400` `void`
   * @response `403` `void`
   * @response `404` `void`
   * @response `405` `void`
   * @response `500` `void`
   */
  getChatRoomMetaData = (
    roomId: number,
    query: {
      /**
       * 현재 채팅방 기준 푸드트럭 사장인지 여부
       * @example false
       */
      isOwner: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetChatRoomMetaDataData, void>({
      path: `/chat/rooms/${roomId}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 특정 채팅방의 메시지 내역을 조회합니다.
   *
   * @tags Chat API
   * @name GetChatMessages
   * @summary 메시지 내역 조회
   * @request GET:/chat/rooms/{roomId}/messages
   * @secure
   * @response `200` `GetChatMessagesData` OK
   */
  getChatMessages = (
    roomId: number,
    query: {
      /**
       * 페이지 번호
       * @format int32
       * @example 0
       */
      page: number;
      /**
       * 페이지 크기
       * @format int32
       * @example 20
       */
      size: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetChatMessagesData, any>({
      path: `/chat/rooms/${roomId}/messages`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
