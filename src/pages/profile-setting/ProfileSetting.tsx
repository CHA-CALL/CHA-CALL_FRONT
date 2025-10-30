import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type UserResponse } from 'apis/data-contracts';

import { Icon } from '@components/icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import { ROUTES } from '@router/constant/routes';
import {
  NOT_ALLOWED_FILE_TYPE,
  CANNOT_UPLOAD_FILE_MB,
} from '@constant/image';

import UserDataSection from '@pages/profile-setting/components/UserDataSection';
import ProfileImageSection from '@pages/profile-setting/components/ProfileImageSection';
import AgreementSection from '@pages/profile-setting/components/AgreementSection';
import DeleteAccountModal from '@pages/profile-setting/@modal/(.)delete-account-modal/DeleteAccountModal';
import ProfileImageBottomSheet from '@pages/profile-setting/components/ProfileImageBottomSheet';
import { user_mockup } from '@pages/mypage/constant/mockup';

export default function ProfileSetting() {
  // TODO: 커스텀 훅으로 분리
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    // TODO: 로그아웃 api 및 토스트 메시지 추가
    alert('로그아웃 되셨습니다.');
    navigate(ROUTES.HOME);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: 토스트메시지로 보여주기
    if (!isAcceptableFile(file)) {
      alert(NOT_ALLOWED_FILE_TYPE);
      return;
    }

    // TODO: 토스트메시지로 보여주기
    if (!isFileSizeValid(file)) {
      alert(CANNOT_UPLOAD_FILE_MB);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUserInfo(prev => (prev ? { ...prev, profileImageUrl: imageUrl } : prev));
    alert('이미지 변경 완료');
    handleCloseBottomSheet();
  };

  const handleDeleteImage = () => {
    // TODO: 회원정보 수정 api
    setUserInfo(prev => (prev ? { ...prev, profileImageUrl: '' } : prev));
    alert('이미지 삭제 완료');
    handleCloseBottomSheet();
  };

  useEffect(() => {
    // TODO: 추후 서버에서 api를 통해 회원정보 조회
    setUserInfo(user_mockup);
  }, []);

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleGoBack}
        text='프로필 설정'
      />
      <div className='flex flex-col items-center gap-[3rem] p-[2rem] pt-[3rem]'>
        <ProfileImageSection
          profileImageUrl={userInfo?.profileImageUrl}
          handleOpenBottomSheet={handleOpenBottomSheet}
        />
        <div className='flex w-full flex-col gap-[2.4rem]'>
          <UserDataSection userInfo={userInfo} />
          <AgreementSection termAgreed={userInfo?.termAgreed} />
        </div>
        <footer className='caption-m-12 fixed-center bottom-[3rem] flex flex-row items-center justify-center'>
          <button
            type='button'
            className='text-grayscale-500 px-[1rem] py-[0.6rem]'
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <div className='bg-grayscale-500 mx-[0.4rem] h-[1rem] w-[0.1rem]' />
          <button
            type='button'
            className='text-grayscale-500 px-[1rem] py-[0.6rem]'
            onClick={handleOpenModal}
          >
            회원탈퇴
          </button>
        </footer>
      </div>
      <DeleteAccountModal isOpen={isModalOpen} handleClose={handleCloseModal} />
      <ProfileImageBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleFileChange={handleFileChange}
        handleDeleteImage={handleDeleteImage}
      />
    </>
  );
}
