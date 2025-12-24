import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@shared/utils/cn';
import Button from '@ui/button/Button';
import { SET_USER_GENDER_TEXT } from '@pages/set-user-info/constant/set-user-constant';
import FormFieldLayout from '@layout/form/FormFieldLayout';

export default function SetUserGender() {
  const { male, female } = SET_USER_GENDER_TEXT;
  const { control } = useFormContext();

  return (
    <FormFieldLayout title='성별' isRequired={false}>
      <Controller
        name='gender'
        control={control}
        render={({ field }) => (
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
        )}
      />
    </FormFieldLayout>
  );
}
