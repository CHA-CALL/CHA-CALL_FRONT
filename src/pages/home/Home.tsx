import { useState } from 'react';

import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import ButtonDate from '@shared/components/button-date/ButtonDate';
import Calendar from '@shared/components/calendar/Calendar';
import type { SelectedDate } from '@shared/types/calendar-types';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: null,
    endDate: null,
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleApplyDate = (date: SelectedDate) => {
    setSelectedDate(date);
  };
  return (
    <div className='bg-white h-dvh relative flex flex-col'>
      <ButtonDate
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        handleOpenCalendar={handleOpenBottomSheet}
      />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        sheetContent={
          <Calendar
            isOpen={isBottomSheetOpen}
            handleApplyDate={handleApplyDate}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        }
        sheetHeight={490}
      />
    </div>
  );
};

export default Home;
