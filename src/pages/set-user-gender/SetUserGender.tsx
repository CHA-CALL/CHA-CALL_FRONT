import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { cn } from '@shared/utils/cn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetUserGender() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState<string | undefined>();
  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    // TODO : 추후 성별 변경 API 추가, 프로필 페이지로 이동 후 toast
    navigate('/set-location');
  };

  return (
    <div className='flex h-dvh flex-col'>
      <Navigation
        text='성별 변경'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='jusify-between flex flex-1 flex-col px-[2rem] pb-[1.7rem]'>
        <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
          <h2 className='title-sb-16 px-[0.5rem]'>성별을 입력해주세요.</h2>
          <div className='flex w-full gap-[1rem]'>
            <Button
              children={<p className='px-[2rem]'>남성</p>}
              variant={'cta'}
              buttonStyle={'sub'}
              onClick={() => setUserGender('남성')}
              className={cn(
                'title-sb-14 w-[50%]',
                userGender === '남성'
                  ? 'bg-primary-25 text-primary-700 border-primary-700'
                  : 'border-grayscale-300'
              )}
            />
            <Button
              children={<p className='px-[2rem]'>여성</p>}
              variant={'cta'}
              buttonStyle={'sub'}
              onClick={() => setUserGender('여성')}
              className={cn(
                'title-sb-14 w-[50%]',
                userGender === '여성'
                  ? 'bg-primary-25 text-primary-700 border-primary-700'
                  : 'border-grayscale-300'
              )}
            />
          </div>
        </div>
        <Button
          variant='cta'
          buttonStyle={userGender ? 'active' : 'disabled'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
