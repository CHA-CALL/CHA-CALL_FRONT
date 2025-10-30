import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { UpdateUserInfoRequest } from 'apis/data-contracts';

import { dummyUserInfo } from '@pages/set-user-info/constant/mocks';
import {
  INITIAL_USER_INFO,
  COMPONENT_MAP,
  VALID_FIELDS,
  type ValidField,
  SET_USER_INFO_TITLES,
} from '@pages/set-user-info/constant/set-user-constant';
import { ROUTES } from '@router/constant/routes';

export default function SetUserInfo() {
  const { field } = useParams<{ field: ValidField }>();
  const [userInfo, setUserInfo] =
    useState<UpdateUserInfoRequest>(INITIAL_USER_INFO);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(dummyUserInfo);
  }, []);

  useEffect(() => {
    if (!field || !VALID_FIELDS.includes(field)) {
      navigate(ROUTES.PROFILE_SETTING, { replace: true });
    }
  }, [field, navigate]);

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
