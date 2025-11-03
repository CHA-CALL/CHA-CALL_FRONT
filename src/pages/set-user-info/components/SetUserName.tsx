import { Controller, useFormContext } from 'react-hook-form';
import ErrorText from '@shared/components/error-text/ErrorText';
import { Icon } from '@components/icon/Icon';
import Input from '@components/input/Input';
import { USER_NAME_MAX_LENGTH } from '@pages/set-user-info/constant/set-user-constant';

export default function SetUserName() {
  const {
    control,
    formState: { errors }, // 폼의 에러 상태
    setValue,
  } = useFormContext();

  const handleClearName = () => {
    setValue('name', '', { shouldValidate: true });
  };
  return (
    <div className='flex flex-1 flex-col gap-[1rem]'>
      <nav className='flex flex-col gap-[0.2rem] px-[0.5rem]'>
        <h2 className='title-sb-14'>이름</h2>
      </nav>

      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <Input
            value={field.value}
            placeholder='이름 입력'
            maxLength={field.value === '' ? undefined : USER_NAME_MAX_LENGTH}
            rightComponent={
              <button className='translate-y-[0.2rem]' type='button'>
                <Icon name='ic_close' />
              </button>
            }
            handleRightClick={handleClearName}
            onChange={field.onChange}
          />
        )}
      />
      {errors.name?.message && (
        <ErrorText text={errors.name.message?.toString()} />
      )}
    </div>
  );
}
