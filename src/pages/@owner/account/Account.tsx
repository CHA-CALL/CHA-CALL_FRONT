import Button from '@shared/components/button/Button';
import Information from '@shared/components/information/Information';
import Navigation from '@shared/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@shared/components/icon/Icon';
import { ROUTES } from '@router/constant/routes';
import { mockup } from '@pages/@owner/account/mockup';

export default function Account() {
  const navigate = useNavigate();
  const data = mockup;

  const handleClickBack = () => {
    navigate(-1);
  };
  const handleSubmitButton = () => {
    navigate(ROUTES.ACCOUNT_FORM);
  };

  const handleEditButton = () => {
    if (data) {
      navigate(`${ROUTES.ACCOUNT_FORM}/${data.id}`);
    } else {
      navigate(ROUTES.ACCOUNT_FORM);
    }
  };

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
            <p className='title-sb-12 text-grayscale-500'>등록된 계좌</p>
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
            key={data.id}
          >
            <div className='flex items-center justify-between'>
              <p className='title-sb-12 text-grayscale-500'>은행명</p>
              <p className='body-m-13 text-grayscale-900'>{data.bank}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='title-sb-12 text-grayscale-500'>예금주</p>
              <p className='body-m-13 text-grayscale-900'>{data.name}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='title-sb-12 text-grayscale-500'>계좌번호</p>
              <p className='body-m-13 text-grayscale-900'>
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
