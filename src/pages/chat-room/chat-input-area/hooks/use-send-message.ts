import { useState } from 'react';
import { MOCK_MESSAGES } from '@pages/chat-room/chat-input-area/constants/mockup';

export interface Message {
  id: number;
  message: string;
  time: string;
  isMine: boolean;
  profileImage?: string;
  isRead?: boolean;
}

export const useSendMessage = () => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

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

  // 메시지 전송 핸들러
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      message: text,
      time: getCurrentTime(),
      isMine: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return {
    messages,
    handleSendMessage,
  };
}
