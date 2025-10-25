import Overlay from '@components/overlay/Overlay';
import Button from '@components/button/Button';

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
  return (
    <Overlay
      isOpen={isModalOpen}
      position='center'
      handleClose={handleCloseModal}
    >
      <div className='flex flex-col pt-[2.4rem] pb-[2rem] px-[2rem] rounded-[1.6rem] bg-white'>
        <span className='title-sb-16 text-grayscale-900'>
          {isOnboarding ? '신청하시겠습니까?' : '아직 완료되지 않았어요!'}
        </span>
        <span className='caption-m-12 text-grayscale-700 mb-[1.6rem]'>
          {isOnboarding ? '최종 승인까지 영업일 기준 3-5일이 소요돼요.' : '페이지를 나가면 작성 중인 내용이 사라집니다.'}
        </span>
        <div className='flex gap-[1rem]'>
          {isOnboarding ? (
            <>
              <Button
                variant='cta'
                buttonStyle='sub'
                handleClickButton={handleCloseModal}
                className='w-[12.4rem]'
              >
                취소
              </Button>
              <Button
                variant='cta'
                buttonStyle='active'
                handleClickButton={handleConfirm}
                className='w-[12.4rem]'
              >
                확인
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='cta'
                buttonStyle='sub'
                handleClickButton={handleConfirm}
                className='w-[12.4rem]'
              >
                나가기
              </Button>
              <Button
                variant='cta'
                buttonStyle='active'
                handleClickButton={handleCloseModal}
                className='w-[12.4rem]'
              >
                취소
              </Button>
            </>
          )}
        </div>
      </div>
    </Overlay>
  );
}
