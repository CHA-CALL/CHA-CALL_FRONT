import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';
import ButtonCheck from '@ui/button-check/ButtonCheck';
import { Icon } from '@icon/Icon';
import { Controller, useFormContext } from 'react-hook-form';

export default function SetAgreement() {
  const navigate = useNavigate();
  // TODO: 추후 약관 페이지로
  const handleNavigateToTerm = () => {
    navigate(ROUTES.HOME);
  };
  const { control } = useFormContext();
  return (
    <Controller
      name='termAgreed'
      control={control}
      render={({ field }) => (
        <div className='border-grayscale-200 flex flex-row items-center gap-[1.8rem] border-t-[0.1rem] py-[2rem]'>
          <div className='flex flex-row gap-[0.8rem]'>
            <ButtonCheck
              isChecked={field.value}
              handleToggle={() => field.onChange(!field.value)}
            />
            <span className='text-grayscale-900 caption-m-12'>
              개인정보수집 및 이용 동의 - 푸드트럭 추천
              <span className='text-grayscale-500'> (선택)</span>
            </span>
          </div>
          <button type='button' onClick={handleNavigateToTerm}>
            <Icon name='ic_next' width={18} height={18} />
          </button>
        </div>
      )}
    />
  );
}
