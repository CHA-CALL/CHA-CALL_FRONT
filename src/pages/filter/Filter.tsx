import { useState } from 'react';

import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import ButtonText from '@shared/components/button-text/ButtonText';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Calendar from '@shared/components/calendar/Calendar';
import type { SelectedDate } from '@shared/types/calendar-types';
import ButtonDate from '@shared/components/button-date/ButtonDate';
import FilterChipGroup from '@pages/filter/components/FilterChipGroup';
import {
  ELECTRICITY_USAGE,
  EVENT_TYPE,
  FOOD_TYPE,
  PAYMENT_TYPE,
  SERVING_SIZE,
} from '@pages/filter/constant/filter-option-constants';
import { cn } from '@shared/utils/cn';
import Button from '@shared/components/button/Button';

export default function Filter() {
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
      <Navigation
        leftIcon={<Icon name='ic_back' color='#19212A' />}
        // rightIcon={
        //   <Button variant='cta' buttonStyle='sub'>
        //     초기화
        //   </Button>
        // }
        text='필터'
      />
      <div className='mb-[9rem] flex flex-col gap-[2.8rem] p-[2rem]'>
        <FilterChipGroup filterTitle='행사 종류' options={EVENT_TYPE} />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <div className='mb-[2rem] flex flex-col gap-[2rem]'>
          <div className='flex flex-row items-center justify-between'>
            <h2 className='px-[0.5rem] title-b-14'>일정</h2>
            <ButtonText>일정 추가하기</ButtonText>
          </div>
          <ButtonDate
            startDate={selectedDate.startDate}
            endDate={selectedDate.endDate}
            handleOpenCalendar={handleOpenCalendar}
          />
        </div>
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <FilterChipGroup filterTitle='수량' options={SERVING_SIZE} />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <FilterChipGroup
          filterTitle='음식 종류'
          options={FOOD_TYPE}
          multiSelectable
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <FilterChipGroup filterTitle='전기 사용' options={ELECTRICITY_USAGE} />

        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <FilterChipGroup filterTitle='결제 방법' options={PAYMENT_TYPE} />
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseCalendar}
        sheetContent={
          <Calendar
            selectedDate={selectedDate}
            handleApplyDate={handleApplyDate}
            handleCloseBottomSheet={handleCloseCalendar}
            isOpen={isBottomSheetOpen}
          />
        }
        sheetHeight={490}
      />
      <div
        className={cn(
          'fixed bottom-[0rem] w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]',
          'shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)]'
        )}
      >
        <Button variant='cta' buttonStyle='disabled'>
          적용
        </Button>
      </div>
    </div>
  );
}
