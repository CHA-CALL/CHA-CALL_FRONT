import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@shared/utils/cn';
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
  FOOD_TYPE,
  PAYMENT_TYPE,
  SERVING_SIZE,
} from '@pages/filter/constant/filter-option-constants';
import Button from '@shared/components/button/Button';
import { useFilterStore } from '@shared/store/filter-store';

export default function Filter() {
  const navigate = useNavigate();

  const {
    filters,
    setSingle,
    setMulti,
    applyDate,
    addSchedule,
    reset,
    isInitialState,
    getCleanedFilters,
  } = useFilterStore();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number | null>(null);

  const handleGoBack = () => navigate(-1);

  const handleSelectSingle = (
    key: 'servingSize' | 'electricityUsage' | 'paymentType',
    value: string
  ) => setSingle(key, value);

  const handleSelectMulti = (key: 'foodType', value: string) =>
    setMulti(key, value);

  const handleApplyDate = (date: SelectedDate, index: number) =>
    applyDate(date, index);

  const handleAddSchedule = () => addSchedule();

  const handleResetFilter = () => reset();

  const handleOpenCalendar = (index: number) => {
    setCurrentDateIndex(index);
    setIsBottomSheetOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsBottomSheetOpen(false);
    setCurrentDateIndex(null);
  };

  // TODO: 서버에 필터링 요청
  const handleApplyFilter = () => {
    const cleanedFilters = getCleanedFilters();
    alert(JSON.stringify(cleanedFilters, null, 2));
    navigate('/reservation');
  };
  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleGoBack}
        rightIcon={
          <Button variant='default' buttonStyle='edit'>
            초기화
          </Button>
        }
        handleRightClick={handleResetFilter}
        text='필터'
      />

      <div className='flex flex-col gap-[2.8rem] p-[2rem] pb-[10rem]'>
        <div className='mb-[2rem] flex flex-col gap-[2rem]'>
          <div className='flex flex-row items-center justify-between'>
            <h2 className='px-[0.5rem] title-b-14'>일정</h2>
            <ButtonText handleClick={handleAddSchedule}>
              일정 추가하기
            </ButtonText>
          </div>
          {filters.date.map((date, index) => (
            <ButtonDate
              key={index}
              startDate={date.startDate}
              endDate={date.endDate}
              handleOpenCalendar={() => handleOpenCalendar(index)}
            />
          ))}
        </div>
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup
          filterTitle='수량'
          selectedOption={filters.servingSize ?? ''}
          options={SERVING_SIZE}
          handleSelectFilter={value => handleSelectSingle('servingSize', value)}
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup
          filterTitle='음식 종류'
          selectedOption={filters.foodType ?? []}
          options={FOOD_TYPE}
          multiSelectable
          handleSelectFilter={value => handleSelectMulti('foodType', value)}
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup
          filterTitle='전기 사용'
          selectedOption={filters.electricityUsage ?? ''}
          options={ELECTRICITY_USAGE}
          handleSelectFilter={value =>
            handleSelectSingle('electricityUsage', value)
          }
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup
          filterTitle='결제 방법'
          selectedOption={filters.paymentType ?? ''}
          options={PAYMENT_TYPE}
          handleSelectFilter={value => handleSelectSingle('paymentType', value)}
        />
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseCalendar}
        sheetContent={
          currentDateIndex !== null ? (
            <Calendar
              selectedDate={
                filters.date?.[currentDateIndex] ?? {
                  startDate: null,
                  endDate: null,
                }
              }
              handleApplyDate={date => handleApplyDate(date, currentDateIndex)}
              handleCloseBottomSheet={handleCloseCalendar}
              isOpen={isBottomSheetOpen}
            />
          ) : null
        }
        sheetHeight={490}
      />

      <footer
        className={cn(
          'fixed bottom-[0rem] w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]',
          'shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)]'
        )}
      >
        <Button
          variant='cta'
          buttonStyle={isInitialState() ? 'disabled' : 'active'}
          handleClickButton={handleApplyFilter}
        >
          적용
        </Button>
      </footer>
    </>
  );
}
