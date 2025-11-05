import Button from '@ui/button/Button';
import { cn } from '@shared/utils/cn';
import { SET_USER_GENDER_TEXT } from '@pages/set-user-info/constant/set-user-constant';
import { Controller, useFormContext } from 'react-hook-form';

export default function SetUserGender() {
  const { male, female } = SET_USER_GENDER_TEXT;
  const { control } = useFormContext();

  return (
    <Controller
      name='gender'
      control={control}
      render={({ field }) => (
        <div className='flex flex-1 flex-col gap-[1rem]'>
          <h2 className='title-sb-14 px-[0.5rem]'>성별</h2>
          <div className='flex w-full gap-[1rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              onClick={() => field.onChange(male)}
              className={cn(
                'title-sb-14',
                field.value === male
                  ? 'bg-primary-25 text-primary-700 border-primary-700'
                  : 'border-grayscale-300'
              )}
            >
              {male}
            </Button>
            <Button
              variant='cta'
              buttonStyle='sub'
              onClick={() => field.onChange(female)}
              className={cn(
                'title-sb-14',
                field.value === female
                  ? 'bg-primary-25 text-primary-700 border-primary-700'
                  : 'border-grayscale-300'
              )}
            >
              {female}
            </Button>
          </div>
        </div>
      )}
    />
  );
}
