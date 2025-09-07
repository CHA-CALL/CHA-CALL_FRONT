import ChatListItem from '@shared/components/chat-list-item/ChatListItem';
import { Icon } from '@shared/components/icon/Icon';
import { useState } from 'react';

const Home = () => {
  const [check, setCheck] = useState(false);
  const handleCheckChange = () => {
    setCheck(prev => !prev);
  };
  return (
    <div>
      <ChatListItem
        isEditing={true}
        clientName={'고객이름'}
        tagTitle={'오소리 푸드트럭'}
        lastChat={'혹시 예약 가능할까요?'}
        lastChatTime={'오후 5:40'}
        unreadCount={312}
        isChecked={check}
        handleCheckChange={handleCheckChange}
      />
      <ChatListItem
        isEditing={true}
        clientName={'고객이름고객이름고객이름고객이름고객이름'}
        tagTitle={'오소리 푸드트럭'}
        lastChat={'네 알겠습니다 긴내용답변긴긴내용답변긴내용답변긴긴내용답변긴내용답변긴긴내용답변긴내용답변긴긴내용답변'}
        lastChatTime={'오후 10:40'}
        unreadCount={0}
        isChecked={check}
        handleCheckChange={handleCheckChange}
      />
      <Icon name='ic_search' />
      <Icon name='ic_search' width={40} height={40} />
      <Icon name='ic_confirm' width={40} height={40} color='#F83419' />
      <p className='heading-sb-20'>Hello World</p>
      <p className='heading-sb-18'>Hello World</p>
      <p className='title-b-16'>Hello World</p>
      <p className='title-b-14'>Hello World</p>
      <p className='title-sb-16'>Hello World</p>
      <p className='title-sb-14'>Hello World</p>
      <p className='title-sb-12'>Hello World</p>
      <p className='body-m-16'>Hello World</p>
      <p className='body-m-14'>Hello World</p>
      <p className='caption-m-12'>Hello World</p>
      <p className='caption-r-12'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='heading-sb-20'>Hello World</p>
      <p className='heading-sb-18'>Hello World</p>
      <p className='title-b-16'>Hello World</p>
      <p className='title-b-14'>Hello World</p>
      <p className='title-sb-16'>Hello World</p>
      <p className='title-sb-14'>Hello World</p>
      <p className='title-sb-12'>Hello World</p>
      <p className='body-m-16'>Hello World</p>
      <p className='body-m-14'>Hello World</p>
      <p className='caption-m-12'>Hello World</p>
      <p className='caption-r-12'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='bg-primary-25'>Hello World</p>
      <p className='bg-primary-50'>Hello World</p>
      <p className='bg-primary-100'>Hello World</p>
      <p className='bg-primary-300'>Hello World</p>
      <p className='bg-primary-500'>Hello World</p>
      <p className='bg-primary-700'>Hello World</p>
      <p className='bg-primary-900'>Hello World</p>
      <p className='bg-grayscale-50'>Hello World</p>
      <p className='bg-grayscale-100'>Hello World</p>
      <p className='bg-grayscale-200'>Hello World</p>
      <p className='bg-grayscale-300'>Hello World</p>
      <p className='bg-grayscale-500'>Hello World</p>
      <p className='bg-grayscale-700'>Hello World</p>
      <p className='bg-grayscale-900'>Hello World</p>
      <p className='bg-white'>Hello World</p>
      <p className='bg-black50'>Hello World</p>
      <p className='bg-black'>Hello World</p>
    </div>
  );
};

export default Home;
