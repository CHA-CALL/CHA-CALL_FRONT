import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import ButtonDate from '@shared/components/button-date/ButtonDate';
import Calendar from '@shared/components/calendar/Calendar';
import { useState } from 'react';

const Home = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSelectDate = (startDate: Date | null, endDate: Date | null) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <div className='bg-white h-dvh relative flex flex-col'>
      <ButtonDate
        startDate={startDate}
        endDate={endDate}
        handleOpenCalendar={handleOpenBottomSheet}
      />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        sheetContent={
          <Calendar handleCloseBottomSheet={handleCloseBottomSheet} />
        }
        sheetHeight={490}
      />
    </div>
  );
};

export default Home;
