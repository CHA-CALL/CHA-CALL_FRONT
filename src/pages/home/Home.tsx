import { useState } from 'react';
import Button from '@ui/button/Button';
import Overlay from '@layout/overlay/Overlay';
import Input from '@ui/input/Input';
import { Icon } from '@icon/Icon';
import RatingBottomSheet from '@ui/rating-bottom-sheet/RatingBottomSheet';
import ChatBubble from '@components/chat/chat-bubble/ChatBubble';
import NewChatIndicator from '@components/chat/new-chat-indicator/NewChatIndicator';

const Home = () => {
  // BottomSheet states
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search states
  const [searchValue, setSearchValue] = useState('');

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Modal */}
      <Overlay
        isOpen={isModalOpen}
        position='center'
        handleClose={handleCloseModal}
      >
        <div>
          <h3 className='mb-[2rem] text-[1.8rem] font-bold'>모달 제목</h3>
          <p className='mb-[2rem]'>모달 내용입니다.</p>
          <div className='flex gap-[1rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleCloseModal}
            >
              취소
            </Button>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={handleCloseModal}
            >
              확인
            </Button>
          </div>
        </div>
      </Overlay>

      {/* BottomSheet */}

      <RatingBottomSheet
        reservationId={4}
        foodTruckId={1}
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />

      {/* Search Bar */}
      <section>
        <h2 className='mb-[2rem] text-[2rem] font-bold'>Search Bar</h2>
        <Input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder='검색어를 입력하세요'
        />
      </section>

      {/* Modal and BottomSheet Triggers */}
      <section>
        <h2 className='mb-[2rem] text-[2rem] font-bold'>
          Modals & Bottom Sheets
        </h2>
        <div className='flex gap-[2rem]'>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleOpenModal}
          >
            모달 열기
          </Button>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleOpenBottomSheet}
          >
            바텀시트 열기
          </Button>
        </div>
      </section>
      <Icon name='ic_chat_dot' className='text-primary-500' />

      {/* 채팅 말풍선 테스트 */}
      <div className='flex flex-col gap-[1rem] p-[2rem] bg-white border-1 border-grayscale-900'>
        <ChatBubble
          message='안녕하세요'
          time='오후 5:21'
          isMine={false}
          profileImage='https://placehold.co/30'
        />
        <ChatBubble
          message='혹시 거래 가능할까요?'
          time='오후 5:21'
          isMine={false}
        />
        <ChatBubble
          message='넵, 가능합니다!'
          time='오후 9:00'
          isRead={true}
        />
        <ChatBubble
          time='오후 9:00'
          isRead={true}
          handleReservationClick={() => {}}
        />
        <ChatBubble
          time='오후 10:00'
          isMine={false}
          profileImage='https://placehold.co/30'
          handleReservationClick={() => {}}
        />
        {Array.from({ length: 20 }).map((_, i) => (
          <ChatBubble
            key={i}
            message='감사합니다!'
            time='오후 10:05'
            isMine={true}
          />
        ))}
        <NewChatIndicator
          name='이현준'
          profileImage='https://placehold.co/26'
          message='메시지 확인해주세요!'
        />
      </div>
    </div>
  );
};

export default Home;
