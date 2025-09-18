import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/button/Button';
import { mockup } from './mockup';
import Message from './components/Message';
import Information from '@shared/components/information/Information';

export default function MessageList() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const onAddClick = () => {
    navigate('/owner/message-form');
  };
  const messageList = mockup;
  return (
    <div>
      <Navigation
        text='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='sticky top-[4.8rem] z-10 bg-white p-[2rem]'>
        <Information
          iconId='ic_chat'
          text='한 번 등록하면 채팅에서 바로 내용 전송이 가능해요!'
        />
      </div>

      <div className='relative flex flex-col px-[2rem]'>
        <div className='flex flex-col gap-[1.2rem] overflow-y-auto'>
          {messageList.map((message, index) => (
            <Message key={index} number={index + 1} message={message.message} />
          ))}
        </div>

        <footer className='sticky bottom-[0] left-[0] right-[0] w-full bg-white py-[1.7rem]'>
          <Button
            variant='default'
            buttonStyle='large'
            className='body-m-14 border-grayscale-200 h-[5.4rem] w-full rounded-[1.6rem] border'
            handleClickButton={onAddClick}
          >
            + 추가하기
          </Button>
        </footer>
      </div>
    </div>
  );
}
