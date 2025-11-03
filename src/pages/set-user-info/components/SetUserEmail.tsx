import ErrorText from '@components/error-text/ErrorText';
import { Icon } from '@components/icon/Icon';
import Input from '@components/input/Input';
import { Controller, useFormContext } from 'react-hook-form';

export default function SetUserEmail() {
  const {
    control,
    formState: { errors }, // 폼의 에러 상태
    setValue,
  } = useFormContext();

  const handleClearEmail = () => {
    setValue('email', '', { shouldValidate: true });
  };

  return (
    <div className='flex flex-1 flex-col gap-[1rem]'>
      <h2 className='title-sb-14 px-[0.5rem]'>이메일</h2>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <Input
            value={field.value}
            onChange={field.onChange}
            placeholder={'이메일 입력'}
            rightComponent={
              <button className='translate-y-[0.2rem]' type='button'>
                <Icon name='ic_close' />
              </button>
            }
            handleRightClick={handleClearEmail}
          />
        )}
      />
      {errors.email?.message && (
        <ErrorText text={errors.email.message?.toString()} />
      )}
    </div>
  );
}
