import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Loading from '@shared/components/loading/Loading';
import Navigation from '@shared/components/navigation/Navigation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetUserName from '@pages/set-user-info/components/SetUserName';
import SetUserEmail from '@pages/set-user-info/components/SetUserEmail';
import SetUserGender from '@pages/set-user-info/components/SetUserGender';
import SetAgreement from '@pages/set-user-info/components/SetAgreement';
import SetUserImage from '@pages/set-user-info/components/SetUserImage';
import ProfileImageBottomSheet from '@pages/set-user-info/components/ProfileImageBottomSheet';
import { FormProvider } from 'react-hook-form';
import { useSetUserInfo } from '@pages/set-user-info/hooks/use-set-user-info';

export default function SetUserInfo() {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { formMethods, handleSubmit, isFetching, isValid, userData } =
    useSetUserInfo();

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  const handleClickBack = () => navigate(-1);

  if (isFetching || !userData) {
    return <Loading />;
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit} className='relative'>
        <ProfileImageBottomSheet
          isBottomSheetOpen={isBottomSheetOpen}
          handleCloseBottomSheet={handleCloseBottomSheet}
        />
        <Navigation
          text={'프로필 수정'}
          leftIcon={<Icon name='ic_back' />}
          handleLeftClick={handleClickBack}
        />
        <div className='flex flex-col items-center gap-[2rem] p-[2rem]'>
          <SetUserImage handleOpenBottomSheet={handleOpenBottomSheet} />
          <div className='flex w-full flex-col gap-[3rem]'>
            <SetUserName />
            <SetUserEmail />
            <SetUserGender />
            <SetAgreement />
          </div>
        </div>

        <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
          <Button
            type='submit'
            variant='cta'
            buttonStyle={isValid ? 'active' : 'disabled'}
            className='h-[5.4rem]'
          >
            저장하기
          </Button>
        </footer>
      </form>
    </FormProvider>
  );
}
