import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/button/Button';
import { mockup } from '@pages/@owner/message-list/mockup';
import Message from '@pages/@owner/message-list/components/Message';
import Information from '@shared/components/information/Information';
import { ROUTES } from '@router/constant/routes';

export default function MessageList() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const onAddClick = () => {
    navigate(ROUTES.MESSAGE_FORM);
  };
  const messageList = mockup;
  return (
    <>
      <Navigation
        text='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='sticky top-[4.8rem] z-10 bg-white p-[2rem] pb-[1.6rem]'>
        <Information
          iconId='ic_chat'
          text='한 번 등록하면 채팅에서 바로 내용 전송이 가능해요!'
        />
      </div>

      <div className='flex flex-col gap-[1.2rem] overflow-y-auto px-[2rem]'>
        {messageList &&
          messageList.map((message, index) => (
            <Message key={index} number={index + 1} message={message.message} />
          ))}
      </div>

      <footer className='sticky bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='default'
          buttonStyle='large'
          className='body-m-14 border-grayscale-200 w-full rounded-[1.6rem] border'
          handleClickButton={onAddClick}
        >
          + 추가하기
        </Button>
      </footer>
    </>
  );
}
