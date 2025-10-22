import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import { useGetUserInfo } from '@pages/mypage/hooks/use-user-data';
import DeleteAccountModal from '@pages/profile-setting/@modal/(.)delete-account-modal/DeleteAccountModal';
import AgreementSection from '@pages/profile-setting/components/AgreementSection';
import ProfileImageSection from '@pages/profile-setting/components/ProfileImageSection';
import UserDataSection from '@pages/profile-setting/components/UserDataSection';
import { ROUTES } from '@router/constant/routes';
import Button from '@shared/components/button/Button';
import Loading from '@shared/components/loading/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO : 백엔드 측에 이미지 삭제한 경우 어떻게 보내는지 질문.

export default function ProfileSetting() {
  // TODO: 커스텀 훅으로 분리 - 수정 api, 편집 가능한지 확인 후에.
  const navigate = useNavigate();

  const { data: userData, isPending: isUserDataPending } = useGetUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isUserDataPending || !userData) {
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
        text='프로필 설정'
        rightIcon={
          <Button
            style={{ paddingLeft: '1.84rem', paddingRight: '1.84rem' }}
            children={'편집'}
            variant={'default'}
            buttonStyle={'edit'}
            onClick={handleEditProfile}
          />
        }
      />
      <div className='flex flex-col items-center gap-[3rem] p-[2rem] pt-[3rem]'>
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
      <DeleteAccountModal isOpen={isModalOpen} handleClose={handleCloseModal} />
    </>
  );
}
