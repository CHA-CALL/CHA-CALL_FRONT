import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';
import type { SetUserInfoItemProps } from '../types/set-user-types';
import ButtonCheck from '@shared/components/button-check/ButtonCheck';
import { Icon } from '@shared/components/icon/Icon';
import Loading from '@shared/components/loading/Loading';

export default function SetAgreement({
  userInfo,
  setUserInfo,
}: SetUserInfoItemProps) {
  const navigate = useNavigate();
  // TODO: 추후 약관 페이지로
  const handleNavigateToTerm = () => {
    navigate(ROUTES.HOME);
  };
  const handleToggleTermAgreed = () => {
    setUserInfo(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        termAgreed: !prev.termAgreed,
      };
    });
  };
  if (userInfo === undefined || !userInfo.termAgreed) {
    return <Loading />;
  }
  return (
    <div className='border-grayscale-200 flex flex-row items-center justify-between border-t-[0.1rem] px-[1.8rem] py-[1.6rem]'>
      <div className='flex flex-row gap-[0.8rem]'>
        <ButtonCheck
          isChecked={userInfo.termAgreed}
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
