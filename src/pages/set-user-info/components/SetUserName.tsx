import { Controller, useFormContext } from 'react-hook-form';
import { Icon } from '@icon/Icon';
import Input from '@ui/input/Input';
import ErrorText from '@form/error-text/ErrorText';
import { USER_NAME_MAX_LENGTH } from '@pages/set-user-info/constant/set-user-constant';
import FormFieldLayout from '@layout/form/FormFieldLayout';

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
    <FormFieldLayout title='이름' isRequired={false}>
      <div className='flex flex-col gap-[1rem]'>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              placeholder={'이름을 입력해주세요.'}
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
    </FormFieldLayout>
  );
}
