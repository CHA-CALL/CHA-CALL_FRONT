import { useState, useEffect } from 'react';
import { mockup } from '@pages/chat-list/constant/chat-list-constant';
import type { Chat } from '@pages/chat-list/types/chat-list-type';

export const useChatList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('전체보기');
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectChatList, setSelectChatList] = useState(new Set<number>());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const handleCheckChange = (clientId: number) => {
    setSelectChatList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clientId)) {
        newSet.delete(clientId);
      } else {
        newSet.add(clientId);
      }
      return newSet;
    });
  };

  const handleSelectOff = () => {
    const newSet = new Set<number>();
    setSelectChatList(newSet);
  };

  const handleDeleteChat = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => setIsDeleteModalOpen(false);

  useEffect(() => {
    /** API 준비 전 더미 데이터 사용*/
    setChatList(mockup);
  }, []);

  return {
    isEditing,
    activeFilter,
    setActiveFilter,
    chatList,
    selectChatList,
    handleToggleEdit,
    handleCheckChange,
    handleSelectOff,
    handleDeleteChat,
    isDeleteModalOpen,
    handleCloseModal,
  };
};
