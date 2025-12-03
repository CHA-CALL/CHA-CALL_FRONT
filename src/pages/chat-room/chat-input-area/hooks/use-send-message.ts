import { useState } from 'react';
import { MOCK_MESSAGE_LIST } from '@pages/chat-room/chat-input-area/constants/mockup';
import type { ReservationMessageType } from '@pages/chat-room/types/reservation-message-type';

export interface Message {
  id: number;
  reservationMessageType?: ReservationMessageType;
  isCancelled?: boolean;
  message?: string;
  time: string;
  date?: string;
  isMine: boolean;
  profileImage?: string;
  isRead?: boolean;
}

export const useSendMessage = () => {
  const [messageList, setMessageList] = useState<Message[]>(MOCK_MESSAGE_LIST);

  // 현재 시간
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${ampm} ${formattedHours}:${formattedMinutes}`;
  };

  // 현재 날짜
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      message: text,
      time: getCurrentTime(),
      date: getCurrentDate(),
      isMine: true,
    };
    setMessageList((prev) => [...prev, newMessage]);
  };

  return {
    messages: messageList,
    handleSendMessage,
  };
}
