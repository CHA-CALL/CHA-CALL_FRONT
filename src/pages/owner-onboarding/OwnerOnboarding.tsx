import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@shared/components/button/Button';
import { useOwnerInput } from '@pages/owner-onboarding/hooks/useOwnerInput';
import NameSection from '@pages/owner-onboarding/components/name-section';
import BizRegCertSection from '@pages/owner-onboarding/components/bizRegCert-section';
import OtherDocsSection from '@pages/owner-onboarding/components/otherDocs-section';

export default function OwnerOnboarding() {
  const {
    formData,
    errors,
    updateName,
    updateBizRegCertFile,
    updateOtherDocsFiles,
    handleCheckNameDuplicate,
    handleSubmit,
    isFormValid,
  } = useOwnerInput();

  return (
    <>
      <Navigation text='Owner Onboarding' leftIcon={<Icon name='ic_back' />} />
      <div className='flex w-full flex-col items-start justify-start gap-[2.6rem] p-[2rem] gap-[2.6rem] min-h-[calc(100vh-4.8rem)]'>
        <NameSection
          value={formData.name}
          onChange={updateName}
          handleCheckNameDuplicate={() =>
            handleCheckNameDuplicate(formData.name)
          }
          error={errors.name}
        />
        <div className='w-full h-[0.1rem] bg-grayscale-100' />
        <BizRegCertSection
          file={formData.bizRegCert}
          onChange={updateBizRegCertFile}
          error={errors.bizRegCert}
        />
        <div className='w-full h-[0.1rem] bg-grayscale-100' />

        <OtherDocsSection
          files={formData.otherDocs}
          onChange={updateOtherDocsFiles}
          error={errors.otherDocs}
        />
      </div>
      <footer className='sticky bottom-0 right-0 w-full px-[2rem] py-[1.7rem] bg-white'>
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
