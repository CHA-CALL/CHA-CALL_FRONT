import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@shared/components/button/Button';
import { useFoodTruckInput } from '@pages/@owner/food-truck-onboarding/hooks/useFoodTruckInput';
import NameSection from '@pages/@owner/food-truck-onboarding/components/NameSection';
import BizRegCertSection from '@pages/@owner/food-truck-onboarding/components/BizRegCertSection';
import OtherDocsSection from '@pages/@owner/food-truck-onboarding/components/OtherDocsSection';

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
      <div className='flex w-full flex-col items-start justify-start gap-[2.6rem] px-[2rem] pb-[10rem] pt-[6.8rem]'>
        <NameSection
          value={formData.name}
          onChange={updateName}
          handleCheckNameDuplicate={handleCheckNameDuplicate}
          error={errors.name}
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <BizRegCertSection
          file={formData.bizRegCert}
          onChange={updateBizRegCertFile}
          error={errors.bizRegCert}
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <OtherDocsSection
          files={formData.otherDocs}
          onChange={updateOtherDocsFiles}
          error={errors.otherDocs}
        />
      </div>
      <footer className='fixed-center bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
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
