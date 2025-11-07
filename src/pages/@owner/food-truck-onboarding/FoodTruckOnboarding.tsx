import Navigation from '@layout/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@ui/button/Button';
import { useFoodTruckInput } from '@pages/@owner/food-truck-onboarding/hooks/use-food-truck-input';
import NameSection from '@pages/@owner/food-truck-onboarding/components/NameSection';
import BizRegCertSection from '@pages/@owner/food-truck-onboarding/components/BizRegCertSection';
import OtherDocsSection from '@pages/@owner/food-truck-onboarding/components/OtherDocsSection';
import { useOnboardingModal } from '@pages/@owner/food-truck-onboarding/hooks/use-onboarding-modal';
import OnboardingModal from '@pages/@owner/food-truck-onboarding/components/OnboardingModal';
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
        text='푸드트럭 등록'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />

      <div className='flex flex-col gap-[2.6rem] w-full p-[2rem]'>
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
          onChange={updateBizRegCertFile}
          error={errors.bizRegCert}
        />
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <OtherDocsSection
          files={formData.otherDocs}
          onChange={updateOtherDocsFiles}
          error={errors.otherDocs}
        />
      </div>

      <footer className='flex flex-col bottom-[0] w-full bg-white px-[2rem] py-[1.7rem] fixed-center gap-[1.3rem]'>
        <p className='caption-m-12 text-grayscale-300'>
          {IMAGE_INFO_MESSAGE}
        </p>
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
