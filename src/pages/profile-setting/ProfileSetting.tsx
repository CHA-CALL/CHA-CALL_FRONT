import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import {
  DEFAULT_PROFILE_IMAGE,
  useGetUserInfo,
  useUpdateUserInfo,
} from '@pages/mypage/hooks/use-user-data';
import DeleteAccountModal from '@pages/profile-setting/@modal/(.)delete-account-modal/DeleteAccountModal';
import AgreementSection from '@pages/profile-setting/components/AgreementSection';
import ProfileImageBottomSheet from '@pages/profile-setting/components/ProfileImageBottomSheet';
import ProfileImageSection from '@pages/profile-setting/components/ProfileImageSection';
import UserDataSection from '@pages/profile-setting/components/UserDataSection';
import { ROUTES } from '@router/constant/routes';
import Loading from '@shared/components/loading/Loading';
import { MAX_MB, NOT_ALLOWED_FILE_TYPE } from '@shared/constant/image';
import useToast from '@shared/hooks/use-toast';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// TODO : 백엔드 측에 이미지 삭제한 경우 어떻게 보내는지 질문.

export default function ProfileSetting() {
  // TODO: 커스텀 훅으로 분리 - 수정 api, 편집 가능한지 확인 후에.
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { showToast, isSuccess, toastMessage } = location.state || {};

  const { data: userData, isPending: isUserDataPending } = useGetUserInfo();
  const { mutate: updateUser, isPending: isUpdateUserPending } =
    useUpdateUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    if (showToast && toastMessage) {
      if (isSuccess) {
        toast.success(toastMessage);
      } else {
        toast.error(toastMessage);
      }
      navigate('.', { replace: true, state: {} });
    }
  }, [isSuccess, navigate, showToast, toast, toastMessage]);

  if (isUserDataPending || isUpdateUserPending || !userData) {
    return <Loading />;
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

    if (!isAcceptableFile(file)) {
      toast.error(NOT_ALLOWED_FILE_TYPE);
      return;
    }

    if (!isFileSizeValid(file)) {
      toast.error(`파일 용량은 ${MAX_MB}MB 이하여야 합니다.`);
      return;
    }

    // TODO : 추후 presignedURL api로 대체
    const imageUrl = URL.createObjectURL(file);

    // TODO : 타입 단언 제거 필요한가? ➡️ api 편집 요청 후 진행
    updateUser({
      profileImageUrl: imageUrl,
    });
    handleCloseBottomSheet();
  };

  const handleDeleteImage = () => {
    updateUser({
      profileImageUrl: DEFAULT_PROFILE_IMAGE,
    });
    handleCloseBottomSheet();
  };

  const handleToggleTermAgreed = () => {
    updateUser({
      profileImageUrl: userData.profileImageUrl!,
      name: userData.name!,
      email: userData.email!,
      gender: userData.gender!,
      termAgreed: !userData.termAgreed!,
    });
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
          <AgreementSection
            termAgreed={userData?.termAgreed}
            handleToggleTermAgreed={handleToggleTermAgreed}
          />
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
