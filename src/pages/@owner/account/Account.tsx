import Button from '@shared/components/button/Button';
import Information from '@shared/components/information/Information';
import Navigation from '@shared/components/navigation/Navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@shared/components/icon/Icon';
import { ROUTES } from '@router/constant/routes';
import { useFetchAccountData } from './hooks/use-account-query';
import useToast from '@shared/hooks/use-toast';
import { useEffect } from 'react';

export default function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { showToast, isSuccess, toastMessage } = location.state || {};

  const { data, isPending } = useFetchAccountData();

  useEffect(() => {
    if (showToast && toastMessage) {
      if (isSuccess) {
        toast.success(toastMessage);
      } else {
        toast.error(toastMessage);
      }
      navigate('.', { replace: true, state: {} });
    }
  }, [isSuccess, navigate, showToast, toast, toastMessage]);

  const handleClickBack = () => {
    navigate(-1);
  };
  const handleSubmitButton = () => {
    navigate(ROUTES.ACCOUNT_FORM);
  };

  const handleEditButton = () => {
    if (data) {
      navigate(`${ROUTES.ACCOUNT_FORM}/${data.bankAccountId}`);
    } else {
      navigate(ROUTES.ACCOUNT_FORM);
    }
  };

  if (isPending) {
    return <div>계좌 정보 로딩중</div>;
  }

  return (
    <>
      <Navigation
        text='결제관리'
        handleLeftClick={handleClickBack}
        leftIcon={<Icon name='ic_back' />}
      />
      <div className='flex flex-col gap-[2rem] p-[2rem] pt-[4rem]'>
        <div className='flex flex-col gap-[1rem]'>
          <div className='flex items-center justify-between'>
            <p className='text-grayscale-500 title-sb-12'>등록된 계좌</p>
            {data && (
              <Button
                variant='default'
                buttonStyle='edit'
                children='수정'
                handleClickButton={handleEditButton}
              />
            )}
          </div>
          <Information
            iconId='ic_chat_dot'
            text='한 번 등록하면 채팅에서 바로 계좌 발송이 가능해요!'
          />
        </div>

        {data ? (
          <div
            className='border-grayscale-200 flex flex-col gap-[2.4rem] rounded-[1.6rem] border px-[2.6rem] py-[2.4rem]'
            key={data.bankAccountId}
          >
            <div className='flex items-center justify-between'>
              <p className='text-grayscale-500 title-sb-12'>은행명</p>
              <p className='text-grayscale-900 body-m-13'>{data.bankName}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-grayscale-500 title-sb-12'>예금주</p>
              <p className='text-grayscale-900 body-m-13'>
                {data.accountHolderName}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-grayscale-500 title-sb-12'>계좌번호</p>
              <p className='text-grayscale-900 body-m-13'>
                {data.accountNumber}
              </p>
            </div>
          </div>
        ) : (
          <Button
            variant='default'
            buttonStyle='large'
            children='+ 추가하기'
            handleClickButton={handleSubmitButton}
          />
        )}
      </div>
    </>
  );
}
