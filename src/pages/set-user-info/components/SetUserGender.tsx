import Button from '@shared/components/button/Button';
import { cn } from '@shared/utils/cn';
import type { SetUserInfoItemProps } from '@pages/set-user-info/types/set-user-types';
import { setUserGenderText } from '@pages/set-user-info/constant/set-user-constant';

export default function SetUserGender({
  newUserInfo,
  setNewUserInfo,
}: SetUserInfoItemProps) {
  const { title, male, female } = setUserGenderText;

  const handleChangeGender = (value: string) => {
    setNewUserInfo(prev => ({
      ...prev,
      gender: value,
    }));
  };

  return (
    <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
      <h2 className='title-sb-16 px-[0.5rem]'>{title}</h2>
      <div className='flex w-full gap-[1rem]'>
        <Button
          children={male}
          variant='cta'
          buttonStyle='sub'
          onClick={() => handleChangeGender(male)}
          className={cn(
            'title-sb-14',
            newUserInfo.gender === male
              ? 'bg-primary-25 text-primary-700 border-primary-700'
              : 'border-grayscale-300'
          )}
        />
        <Button
          children={female}
          variant='cta'
          buttonStyle='sub'
          onClick={() => handleChangeGender(female)}
          className={cn(
            'title-sb-14',
            newUserInfo.gender === female
              ? 'bg-primary-25 text-primary-700 border-primary-700'
              : 'border-grayscale-300'
          )}
        />
      </div>
    </div>
  );
}
