import { useState } from 'react';

export const useChatList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('전체보기');

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

  return {
    isEditing,
    activeFilter,
    setActiveFilter,
    selectChatList,
    handleToggleEdit,
    handleCheckChange,
    handleSelectOff,
    handleDeleteChat,
    isDeleteModalOpen,
    handleCloseModal,
  };
};
