import { Icon } from '@components/icon/Icon';
import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';
import Loading from '@layout/loading/Loading';
import Navigation from '@layout/navigation/Navigation';
import { useGetUserInfo } from '@pages/mypage/hooks/use-user-data';
import AgreementSection from '@pages/profile-setting/components/AgreementSection';
import ProfileImageSection from '@pages/profile-setting/components/ProfileImageSection';
import UserDataSection from '@pages/profile-setting/components/UserDataSection';
import { ROUTES } from '@router/constant/routes';
import Button from '@ui/button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleDeleteAccount = () => {
    // TODO: 회원탈퇴 api 및 토스트 메시지 추가
    alert('회원탈퇴 되셨습니다.');
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate(ROUTES.PROFILE_SETTING_EDIT);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={'정말 탈퇴하시겠어요?'}
        description={`탈퇴하면 모든 정보가 삭제되며, \n복구할 수 없습니다.`}
        handleConfirm={handleDeleteAccount}
        handleCancel={handleCloseModal}
      />
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleGoBack}
        text='프로필 설정'
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
    </>
  );
}
