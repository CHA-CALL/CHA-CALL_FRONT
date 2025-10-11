import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import {
  useFetchUserData,
  usePatchUserData,
} from '@pages/mypage/hooks/use-user-data';
import DeleteAccountModal from '@pages/profile-setting/@modal/(.)delete-account-modal/DeleteAccountModal';
import AgreementSection from '@pages/profile-setting/components/AgreementSection';
import ProfileImageBottomSheet from '@pages/profile-setting/components/ProfileImageBottomSheet';
import ProfileImageSection from '@pages/profile-setting/components/ProfileImageSection';
import UserDataSection from '@pages/profile-setting/components/UserDataSection';
import { ROUTES } from '@router/constant/routes';
import { MAX_MB, NOT_ALLOWED_FILE_TYPE } from '@shared/constant/image';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_PROFILE_IMAGE =
  'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg';
export default function ProfileSetting() {
  // TODO: 커스텀 훅으로 분리
  const navigate = useNavigate();
  const { data: userData, isLoading } = useFetchUserData();
  const { mutate: updateUser, isPending } = usePatchUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  if (isLoading || isPending || !userData) {
    return <div>...사용자 정보 불러오는 중</div>;
  }

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
      alert(`파일 용량은 ${MAX_MB}MB 이하여야 합니다.`);
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    // TODO : 타입 단언 제거 필요..
    updateUser({
      profileImageUrl: imageUrl,
      name: userData.name!,
      email: userData.email!,
      gender: userData.gender!,
      termAgreed: userData.termAgreed!,
    });
    alert('이미지 변경 완료');
    handleCloseBottomSheet();
  };

  const handleDeleteImage = () => {
    // TODO: 회원정보 수정 api
    updateUser({
      profileImageUrl: DEFAULT_PROFILE_IMAGE,
      name: userData.name!,
      email: userData.email!,
      gender: userData.gender!,
      termAgreed: userData.termAgreed!,
    });

    alert('이미지 삭제 완료');
    handleCloseBottomSheet();
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleGoBack}
        text='프로필 설정'
      />
      <div className='flex flex-col items-center gap-[3rem] p-[2rem] pt-[3rem]'>
        <ProfileImageSection
          profileImageUrl={userData?.profileImageUrl}
          handleOpenBottomSheet={handleOpenBottomSheet}
        />
        <div className='flex w-full flex-col gap-[2.4rem]'>
          <UserDataSection userInfo={userData || null} />
          <AgreementSection termAgreed={userData?.termAgreed} />
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
