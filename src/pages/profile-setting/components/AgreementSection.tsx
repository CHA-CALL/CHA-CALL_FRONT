import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonCheck from '@ui/button-check/ButtonCheck';
import { Icon } from '@components/icon/Icon';
import { ROUTES } from '@router/constant/routes';

interface AgreementSectionProps {
  termAgreed: boolean | undefined;
}

export default function AgreementSection({
  termAgreed,
}: AgreementSectionProps) {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  // TODO: 토스트 메시지 및 회원정보 수정 api
  const handleToggleCheck = () => {
    if (!isAgreed) {
      alert('약관 동의가 완료되었습니다.');
    }
    setIsAgreed(!isAgreed);
  };

  // TODO: 추후 약관 페이지로
  const handleNavigateToTerm = () => {
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    setIsAgreed(termAgreed ?? false);
  }, [termAgreed]);

  return (
    <div className='border-grayscale-200 flex flex-row items-center justify-between rounded-[1.6rem] border px-[1.8rem] py-[1.6rem]'>
      <div className='flex flex-row gap-[0.8rem]'>
        <ButtonCheck isChecked={isAgreed} handleToggle={handleToggleCheck} />
        <span className='text-grayscale-900 caption-m-12'>
          개인정보수집 및 이용 동의 - 푸드트럭 추천
          <span className='text-grayscale-500'> (선택)</span>
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
