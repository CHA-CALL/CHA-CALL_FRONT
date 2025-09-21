import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import SetUserName from '@pages/set-user-info/components/SetUserName';
import SetUserEmail from '@pages/set-user-info/components/SetUserEmail';
import SetUserGender from '@pages/set-user-info/components/SetUserGender';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { UpdateUserInfoRequest } from 'apis/data-contracts';
import { dummyUserInfo } from '@pages/set-user-info/constant/mocks';
import type { Field } from '@pages/set-user-info/types/set-user-types';
import {
  initialUserInfo,
  title,
} from '@pages/set-user-info/constant/set-user-constant';

export default function SetUserInfo() {
  const { field } = useParams<{ field: Field }>();

  const [userInfo, setUserInfo] =
    useState<UpdateUserInfoRequest>(initialUserInfo);
  const [newUserInfo, setNewUserInfo] =
    useState<UpdateUserInfoRequest>(initialUserInfo);
  const navigate = useNavigate();

  const checkEmptyValue =
    newUserInfo.name === '' ||
    newUserInfo.email === '' ||
    newUserInfo.gender === undefined;

  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    // TODO : 추후 이메일 변경 API 추가, 프로필 페이지로 이동 후 toast
    alert(`변경된 사용자 정보
      name : ${newUserInfo.name}
      email: ${newUserInfo.email}
      gender: ${newUserInfo.gender}`);
  };

  useEffect(() => {
    setUserInfo(dummyUserInfo);
    setNewUserInfo(dummyUserInfo);
  }, []);

  useEffect(() => {
    if (!field) {
      // 문제가 발생했을 때 돌아갈 안전한 경로를 명시적으로 지정
      navigate('/profile-setting', { replace: true });
    }
  }, [field, navigate]);

  return (
    <div className='flex h-dvh flex-col'>
      <Navigation
        text={title[field ?? 'name']}
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='jusify-between flex flex-1 flex-col px-[2rem] pb-[1.7rem]'>
        {field === 'name' && (
          <SetUserName
            newUserInfo={newUserInfo}
            setNewUserInfo={setNewUserInfo}
            originalName={userInfo.name}
          />
        )}
        {field === 'email' && (
          <SetUserEmail
            newUserInfo={newUserInfo}
            setNewUserInfo={setNewUserInfo}
          />
        )}
        {field === 'gender' && (
          <SetUserGender
            newUserInfo={newUserInfo}
            setNewUserInfo={setNewUserInfo}
          />
        )}

        <Button
          variant='cta'
          buttonStyle={checkEmptyValue ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
