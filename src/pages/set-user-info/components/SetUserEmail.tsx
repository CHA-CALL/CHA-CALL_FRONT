import { Controller, useFormContext } from 'react-hook-form';
import { Icon } from '@icon/Icon';
import Input from '@ui/input/Input';
import ErrorText from '@form/error-text/ErrorText';
import FormFieldLayout from '@layout/form/FormFieldLayout';

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
    <FormFieldLayout title='이메일' isRequired={false}>
      <div className='flex flex-col gap-[1rem]'>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder={'이메일을 입력해주세요.'}
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
    </FormFieldLayout>
  );
}
