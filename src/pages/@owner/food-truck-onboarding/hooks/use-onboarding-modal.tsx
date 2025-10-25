import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOnboardingModal = () => {
  const navigate = useNavigate();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const handleClickBack = () => {
    setIsCancelModalOpen(true);
  }

  const handleClickRegister = () => {
    setIsOnboardingModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsCancelModalOpen(false);
    setIsOnboardingModalOpen(false);
  }

  const handleNavigate = () => {
    // TODO
    // 푸드트럭 관리에서 접근시 푸드트럭 관리로 이동
    // 회원가입 이후 최초 등록시 홈화면으로 이동
    navigate(-1);
  }

  return {
    isCancelModalOpen,
    isOnboardingModalOpen,
    handleClickBack,
    handleClickRegister,
    handleCloseModal,
    handleNavigate,
  };
};
