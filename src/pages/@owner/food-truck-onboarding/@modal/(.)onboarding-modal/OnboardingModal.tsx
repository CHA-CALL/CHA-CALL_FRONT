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
        rightLabel: '확인',
        leftLabel: '취소',
        onClickRight: handleConfirm,
        onClickLeft: handleCloseModal,
      }
    : {
        title: '아직 완료되지 않았어요!',
        description: '페이지를 나가면 작성 중인 내용이 사라집니다.',
        rightLabel: '취소',
        leftLabel: '나가기',
        onClickRight: handleCloseModal,
        onClickLeft: handleConfirm,
      };

  return (
    <ConfirmModal
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
      title={modalConfig.title}
      description={modalConfig.description}
      rightLabel={modalConfig.rightLabel}
      leftLabel={modalConfig.leftLabel}
      handleClickRight={modalConfig.onClickRight}
      handleClickLeft={modalConfig.onClickLeft}
    />
  );
}
