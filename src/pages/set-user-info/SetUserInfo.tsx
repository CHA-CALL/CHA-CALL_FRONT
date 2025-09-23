import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import SetUserInfoSkeletonUI from '@pages/set-user-info/components/SetUserInfoSkeletonUI';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { UpdateUserInfoRequest } from 'apis/data-contracts';
import { dummyUserInfo } from '@pages/set-user-info/constant/mocks';
import {
  COMPONENT_MAP,
  VALID_FIELDS,
  type ValidField,
  SET_USER_INFO_TITLES,
} from '@pages/set-user-info/constant/set-user-constant';
import { ROUTES } from '@router/constant/routes';

export default function SetUserInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const { field } = useParams<{ field: ValidField }>();
  const [userInfo, setUserInfo] = useState<UpdateUserInfoRequest | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setUserInfo(dummyUserInfo);
      setIsLoading(false);
    }, 1000);
    // setUserInfo(dummyUserInfo);
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!field || !VALID_FIELDS.includes(field)) {
      navigate(ROUTES.PROFILE_SETTING, { replace: true });
    }
  }, [field, navigate]);

  if (isLoading || !userInfo) {
    // 로딩 중일 때 보여줄 스켈레톤 UI
    return <SetUserInfoSkeletonUI />;
  }

  const ComponentToRender = field ? COMPONENT_MAP[field] : null;
  const { name: userName, email: userEmail, gender: userGender } = userInfo;

  const isValid =
    userName === '' || userEmail === '' || userGender === undefined;

  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    // TODO : 추후 이메일 변경 API 추가, 프로필 페이지로 이동 후 toast
    alert(`변경된 사용자 정보
      name : ${userName}
      email: ${userEmail}
      gender: ${userGender}`);
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
