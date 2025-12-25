import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';

interface OnboardingModalProps {
  isOnboarding?: boolean;
  isModalOpen: boolean;
  handleConfirm: () => void;
  handleCloseModal: () => void;
}

export default function OnboardingModal({
  isOnboarding = false,
  isModalOpen,
  handleConfirm,
  handleCloseModal,
}: OnboardingModalProps) {

  const modalConfig = isOnboarding
    ? {
      title: '신청하시겠습니까?',
      description: '최종 승인까지 영업일 기준 3-5일이 소요돼요.',
      confirmLabel: '확인',
      cancelLabel: '취소',
      onConfirm: handleConfirm,
      onCancel: handleCloseModal,
    }
    : {
      title: '아직 완료되지 않았어요!',
      description: '페이지를 나가면 작성 중인 내용이 사라집니다.',
      confirmLabel: '나가기', // 문맥상 '확인' 위치에 둠 (Destructive Action)
      cancelLabel: '취소',
      onConfirm: handleConfirm,    // 나가기 동작
      onCancel: handleCloseModal,  // 모달 닫기
    };

  return (
    <ConfirmModal
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
      title={modalConfig.title}
      description={modalConfig.description}
      confirmLabel={modalConfig.confirmLabel}
      cancelLabel={modalConfig.cancelLabel}
      handleConfirm={modalConfig.onConfirm}
      handleCancel={modalConfig.onCancel}
    />
  );
}
