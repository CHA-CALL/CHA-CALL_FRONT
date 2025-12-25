import Navigation from '@layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@ui/button/Button';
import { useFoodTruckInput } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-input';
import {
  NameSection,
  BizRegCertSection,
  OtherDocsSection,
} from '@pages/@owner/food-truck-onboarding/components';
import { useOnboardingModal } from '@pages/@owner/food-truck-onboarding/hooks/use-onboarding-modal';
import OnboardingModal from '@pages/@owner/food-truck-onboarding/@modal/(.)onboarding-modal/OnboardingModal';
import { IMAGE_INFO_MESSAGE } from '@shared/constant/image';

export default function FoodTruckOnboarding() {
  const {
    formData,
    errors,
    updateName,
    updateBizRegCertFile,
    updateOtherDocsFiles,
    handleCheckNameDuplicate,
    handleSubmit,
    isFormValid,
    isNameVerified,
  } = useFoodTruckInput();

  const {
    isCancelModalOpen,
    isOnboardingModalOpen,
    handleClickBack,
    handleClickRegister,
    handleCloseModal,
    handleNavigate,
  } = useOnboardingModal();

  const handleConfirmSubmit = () => {
    handleSubmit();
    handleCloseModal();
  };

  return (
    <>
      <OnboardingModal
        isModalOpen={isCancelModalOpen}
        handleConfirm={handleNavigate}
        handleCloseModal={handleCloseModal}
      />
      <OnboardingModal
        isOnboarding={true}
        isModalOpen={isOnboardingModalOpen}
        handleConfirm={handleConfirmSubmit}
        handleCloseModal={handleCloseModal}
      />

      <Navigation
        centerContent='푸드트럭 등록'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />

      <div className='flex w-full flex-col gap-[2.6rem] p-[2rem]'>
        <NameSection
          isNameVerified={isNameVerified}
          value={formData.name}
          onChange={updateName}
          handleCheckNameDuplicate={handleCheckNameDuplicate}
          error={errors.name}
        />
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <BizRegCertSection
          file={formData.bizRegCert}
          onChange={file => file && updateBizRegCertFile(file)}
          error={errors.bizRegCert}
        />
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <OtherDocsSection
          files={formData.otherDocs}
          onChange={updateOtherDocsFiles}
          error={errors.otherDocs}
        />
      </div>

      <footer className='fixed-center bottom-[0] flex w-full flex-col gap-[1.3rem] bg-white px-[2rem] py-[1.7rem]'>
        <p className='text-grayscale-300 caption-m-12'>{IMAGE_INFO_MESSAGE}</p>
        <Button
          variant='cta'
          buttonStyle={isFormValid ? 'active' : 'disabled'}
          handleClickButton={handleClickRegister}
          disabled={!isFormValid}
        >
          등록하기
        </Button>
      </footer>
    </>
  );
}
