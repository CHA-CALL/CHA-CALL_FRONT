import { Icon } from '@components/icon/Icon';
import Navigation from '@components/layout/navigation/Navigation';
import ChatInputArea from '@pages/chat-room/chat-input-area/ChatInputArea';

export default function ChatRoom() {
  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        text='채팅방'
      />
      <div className='flex flex-col gap-[4rem] p-[2rem]'>채팅 목록</div>
      <footer className='fixed-center bottom-[0] w-full'>
        <ChatInputArea />
      </footer>
    </>
  );
}
