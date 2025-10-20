import ButtonCheck from '@components/button-check/ButtonCheck';
import { Icon } from '@components/icon/Icon';
import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';

interface AgreementSectionProps {
  termAgreed: boolean | undefined;
  handleToggleTermAgreed: () => void;
}

export default function AgreementSection({
  termAgreed,
  handleToggleTermAgreed,
}: AgreementSectionProps) {
  const navigate = useNavigate();
  // TODO: 추후 약관 페이지로
  const handleNavigateToTerm = () => {
    navigate(ROUTES.HOME);
  };

  if (termAgreed === undefined) {
    return <div>약관 동의 여부 로딩 중</div>;
  }

  return (
    <div className='border-grayscale-200 flex flex-row items-center justify-between rounded-[1.6rem] border px-[1.8rem] py-[1.6rem]'>
      <div className='flex flex-row gap-[0.8rem]'>
        <ButtonCheck
          isChecked={termAgreed}
          handleToggle={handleToggleTermAgreed}
        />
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
