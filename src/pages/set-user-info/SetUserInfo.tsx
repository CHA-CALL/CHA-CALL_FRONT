import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { UserResponse } from 'apis/data-contracts';
import {
  INITIAL_USER_INFO,
  COMPONENT_MAP,
  VALID_FIELDS,
  type ValidField,
  SET_USER_INFO_TITLES,
} from '@pages/set-user-info/constant/set-user-constant';
import { ROUTES } from '@router/constant/routes';
import {
  useFetchUserData,
  usePatchUserData,
} from '@pages/mypage/hooks/use-user-data';

export default function SetUserInfo() {
  const { field } = useParams<{ field: ValidField }>();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useFetchUserData();
  const { mutate: updateUser, isPending } = usePatchUserData({
    onSuccess: () => {
      if (!field) {
        navigate('/profile-setting', {
          state: {
            showToast: true,
            toastMessage: '잘못된 주소로의 접근입니다.',
          },
        });
        throw new Error('허용되지 않은 프로필 수정 url 입니다.');
      }
      navigate('/profile-setting', {
        state: {
          showToast: true,
          toastMessage: `${SET_USER_INFO_TITLES[field]}이 완료되었습니다.`,
        },
      });
    },
  });
  const [userInfo, setUserInfo] = useState<UserResponse>(
    userData ?? INITIAL_USER_INFO
  );

  useEffect(() => {
    if (!field || !VALID_FIELDS.includes(field)) {
      navigate(ROUTES.PROFILE_SETTING, { replace: true });
    }
  }, [field, navigate]);

  const ComponentToRender = field ? COMPONENT_MAP[field] : null;
  if (isLoading || isPending || !userData) {
    return <div>...사용자 정보 불러오는 중</div>;
  }

  const { name: userName, email: userEmail, gender: userGender } = userInfo;

  const isValid =
    userName === '' || userEmail === '' || userGender === undefined;

  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    alert(`변경된 사용자 정보
      name : ${userName}
      email: ${userEmail}
      gender: ${userGender}`);

    updateUser({
      profileImageUrl: userData.profileImageUrl!,
      name: userName ?? INITIAL_USER_INFO.name,
      email: userEmail ?? INITIAL_USER_INFO.email,
      gender: userGender ?? INITIAL_USER_INFO.gender,
      termAgreed: userData.termAgreed!,
    });
  };

  return (
    <div className='flex h-dvh flex-col'>
      <Navigation
        text={SET_USER_INFO_TITLES[field ?? 'name']}
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='jusify-between flex flex-1 flex-col px-[2rem] pb-[1.7rem]'>
        {ComponentToRender && (
          <ComponentToRender userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
        <Button
          variant='cta'
          buttonStyle={isValid ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
