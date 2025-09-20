import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import BottomSheet from '@components/bottom-sheet/BottomSheet';
import UserDataSection from '@pages/profile-setting/components/UserDataSection';
import ProfileImageSection from '@pages/profile-setting/components/ProfileImageSection';
import AgreementSection from '@pages/profile-setting/components/AgreementSection';
import Button from '@shared/components/button/Button';
import DeleteAccountModal from './components/DeleteAccountModal';

export default function ProfileSetting() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    // TODO: 로그아웃 api
    navigate('/');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' color='#19212A' />}
        handleLeftClick={handleGoBack}
        text='프로필 설정'
      />
      <div className='flex h-[calc(100vh-4.8rem)] flex-col items-center gap-[3rem] px-[2rem] py-[3rem]'>
        <ProfileImageSection handleOpenBottomSheet={handleOpenBottomSheet} />
        <div className='flex w-full flex-col gap-[2.4rem]'>
          <UserDataSection />
          <AgreementSection />
        </div>
        <footer className='fixed bottom-[3rem] flex flex-row items-center caption-m-12'>
          <button
            type='button'
            className='px-[1rem] py-[0.6rem] text-grayscale-500'
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <div className='mx-[0.4rem] h-[1rem] w-[0.1rem] bg-grayscale-500' />
          <button
            type='button'
            className='px-[1rem] py-[0.6rem] text-grayscale-500'
            onClick={handleOpenModal}
          >
            회원탈퇴
          </button>
        </footer>
      </div>
      <DeleteAccountModal isOpen={isModalOpen} handleClose={handleCloseModal} />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        sheetContent={
          <div className='text-grayscale-700 title-sb-14'>
            <div className='flex justify-center border-b border-grayscale-100 py-[2rem]'>
              <span>수정하기</span>
            </div>
            <div className='flex justify-center py-[2rem]'>
              <span>삭제하기</span>
            </div>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleCloseBottomSheet}
            >
              취소
            </Button>
          </div>
        }
        sheetHeight={230}
      />
    </>
  );
}
