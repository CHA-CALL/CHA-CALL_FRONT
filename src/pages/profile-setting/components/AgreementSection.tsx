import ButtonCheck from '@components/button-check/ButtonCheck';
import { Icon } from '@components/icon/Icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgreementSection() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  // TODO: 토스트 메시지
  const handleToggleCheck = () => {
    setIsAgreed(!isAgreed);
  };

  // TODO: 추후 약관 페이지로
  const handleNavigateToTerm = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-row items-center justify-between rounded-[1.6rem] border border-grayscale-200 px-[1.8rem] py-[1.6rem]'>
      <div className='flex flex-row gap-[0.8rem]'>
        <ButtonCheck isChecked={isAgreed} handleToggle={handleToggleCheck} />
        <span className='text-grayscale-900 caption-m-12'>
          개인정보수집 및 이용 동의 - 푸드트럭 추천{' '}
          <span className='text-grayscale-500'>(선택)</span>
        </span>
      </div>
      <Icon
        name='ic_next'
        width={18}
        height={18}
        onClick={handleNavigateToTerm}
      />
    </div>
  );
}
