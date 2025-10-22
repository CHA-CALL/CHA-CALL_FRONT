import {
  DEFAULT_PROFILE_IMAGE,
  useGetUserInfo,
  useUpdateUserInfo,
} from '@pages/mypage/hooks/use-user-data';
import { INITIAL_USER_INFO } from '@pages/set-user-info/constant/set-user-constant';
import { ROUTES } from '@router/constant/routes';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Loading from '@shared/components/loading/Loading';
import Navigation from '@shared/components/navigation/Navigation';
import type { UserResponse } from 'apis/data-contracts';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetUserName from '@pages/set-user-info/components/SetUserName';
import SetUserEmail from '@pages/set-user-info/components/SetUserEmail';
import SetUserGender from '@pages/set-user-info/components/SetUserGender';
import SetAgreement from '@pages/set-user-info/components/SetAgreement';
import SetUserImage from '@pages/set-user-info/components/SetUserImage';
import ProfileImageBottomSheet from '@pages/set-user-info/components/ProfileImageBottomSheet';
import useToast from '@shared/hooks/use-toast';
import { isAcceptableFile, isFileSizeValid } from '@shared/utils/image';
import { MAX_MB, NOT_ALLOWED_FILE_TYPE } from '@shared/constant/image';

export default function SetUserInfo() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { data: userData, isLoading } = useGetUserInfo();
  const { mutate: updateUser, isPending } = useUpdateUserInfo({
    onSuccess: () => {
      navigate(ROUTES.PROFILE_SETTING, {
        state: {
          showToast: true,
          isSuccess: true,
          toastMessage: '정보가 수정되었습니다.',
        },
      });
    },
  });
  const [userInfo, setUserInfo] = useState<UserResponse>(
    userData ?? INITIAL_USER_INFO
  );

  if (isLoading || isPending || !userData) {
    return <Loading />;
  }

  const { name: userName, email: userEmail, gender: userGender } = userInfo;

  const isValid =
    userName === '' || userEmail === '' || userGender === undefined;
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    updateUser({
      profileImageUrl: userData.profileImageUrl!,
      name: userName ?? INITIAL_USER_INFO.name,
      email: userEmail ?? INITIAL_USER_INFO.email,
      gender: userGender ?? INITIAL_USER_INFO.gender,
      termAgreed: userData.termAgreed!,
    });
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

  return (
    <div className='relative'>
      <ProfileImageBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleFileChange={handleFileChange}
        handleDeleteImage={handleDeleteImage}
      />
      <Navigation
        text={'프로필 수정'}
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col items-center gap-[2rem] p-[2rem]'>
        <SetUserImage
          profileImageUrl={userData?.profileImageUrl}
          handleOpenBottomSheet={handleOpenBottomSheet}
        />
        <div className='flex flex-col gap-[3rem]'>
          <SetUserName userInfo={userInfo} setUserInfo={setUserInfo} />
          <SetUserEmail userInfo={userInfo} setUserInfo={setUserInfo} />
          <SetUserGender userInfo={userInfo} setUserInfo={setUserInfo} />
          <SetAgreement userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      </div>

      <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
        <Button
          variant='cta'
          buttonStyle={isValid ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </footer>
    </div>
  );
}
