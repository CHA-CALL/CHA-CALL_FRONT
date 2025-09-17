import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@shared/components/button/Button';
import { useFoodTruckInput } from '@pages/owner-onboarding/hooks/useFoodTruckInput';
import NameSection from '@pages/owner-onboarding/components/NameSection';
import BizRegCertSection from '@pages/owner-onboarding/components/BizRegCertSection';
import OtherDocsSection from '@pages/owner-onboarding/components/OtherDocsSection';

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
  } = useFoodTruckInput();

  return (
    <>
      <Navigation text='푸드트럭 등록' leftIcon={<Icon name='ic_back' />} />
      <div className='flex min-h-[calc(100vh-13.2rem)] w-full flex-col items-start justify-start gap-[2.6rem] p-[2rem]'>
        <NameSection
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
      <footer className='sticky bottom-[0] left-[0] right-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isFormValid ? 'active' : 'disabled'}
          handleClickButton={handleSubmit}
          disabled={!isFormValid}
        >
          등록하기
        </Button>
      </footer>
    </>
  );
}
