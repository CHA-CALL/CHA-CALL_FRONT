import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@layout/navigation/Navigation';
import { ROUTES } from '@router/constant/routes';
import { Icon } from '@components/icon/Icon';
import Button from '@ui/button/Button';
import Loading from '@layout/loading/Loading';
import DeleteAccountModal from '@pages/profile-setting/@modal/(.)delete-account-modal/DeleteAccountModal';
import {
  AgreementSection,
  ProfileImageSection,
  UserDataSection,
} from '@pages/profile-setting/components';
import { useGetUserInfo } from '@pages/mypage/hooks/use-user-data';

export default function ProfileSetting() {
  const navigate = useNavigate();

  const { data: userData, isPending: isUserDataPending } = useGetUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isUserDataPending) {
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

  const handleEditProfile = () => {
    navigate(ROUTES.PROFILE_SETTING_EDIT);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleGoBack}
        centerContent='프로필 설정'
        rightIcon={
          <Button
            variant='default'
            buttonStyle='edit'
            className='px-[2rem]'
            onClick={handleEditProfile}
          >
            편집
          </Button>
        }
      />
      <div className='flex flex-col items-center gap-[3rem] p-[2rem]'>
        <ProfileImageSection profileImageUrl={userData?.profileImageUrl} />
        <div className='flex w-full flex-col gap-[2.4rem]'>
          <UserDataSection userInfo={userData || null} />
          <AgreementSection termAgreed={userData?.termAgreed} />
        </div>
        <footer className='bottom-[3rem] flex flex-row items-center justify-center caption-m-12 fixed-center'>
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
    </>
  );
}
