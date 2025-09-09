import { useState } from 'react';

import ButtonDate from '@shared/components/button-date/ButtonDate';
import ChatListItem from '@shared/components/chat-list-item/ChatListItem';
import { Icon } from '@shared/components/icon/Icon';
import { type SelectedDate } from '@shared/types/calendar-types';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Calendar from '@shared/components/calendar/Calendar';

const Home = () => {
  const [check, setCheck] = useState(false);
  const handleCheckChange = () => {
    setCheck(prev => !prev);
  };

  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: null,
    endDate: null,
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenCalendar = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsBottomSheetOpen(false);
  };

  const handleApplyDate = (date: SelectedDate) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <ChatListItem
        isEditing={false}
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
        lastChat={
          '네 알겠습니다 긴내용답변긴긴내용답변긴내용답변긴긴내용답변긴내용답변긴긴내용답변긴내용답변긴긴내용답변'
        }
        lastChatTime={'오후 10:40'}
        unreadCount={0}
        isChecked={check}
        handleCheckChange={handleCheckChange}
      />
      <Icon name='ic_search' />
      <Icon name='ic_search' width={40} height={40} />
      <Icon name='ic_confirm' width={40} height={40} color='#F83419' />

      <ButtonDate
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        handleOpenCalendar={handleOpenCalendar}
      />

      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseCalendar}
        sheetContent={
          <Calendar
            isOpen={isBottomSheetOpen}
            handleApplyDate={handleApplyDate}
            handleCloseBottomSheet={handleCloseCalendar}
          />
        }
        sheetHeight={490}
      />
    </div>
  );
};

export default Home;
