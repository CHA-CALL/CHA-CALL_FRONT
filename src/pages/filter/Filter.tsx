import { useState } from 'react';
import { isEqual } from 'lodash';
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
  EVENT_TYPE,
  FOOD_TYPE,
  PAYMENT_TYPE,
  SERVING_SIZE,
} from '@pages/filter/constant/filter-option-constants';
import Button from '@shared/components/button/Button';

interface FilterState {
  eventType: string | null;
  date: SelectedDate[];
  servingSize: string | null;
  foodType: string[] | null;
  electricityUsage: string | null;
  paymentType: string | null;
}

const initialFilter: FilterState = {
  eventType: null,
  date: [{ startDate: null, endDate: null }],
  servingSize: null,
  foodType: null,
  electricityUsage: null,
  paymentType: null,
};

export default function Filter() {
  const navigate = useNavigate();

  // TODO: 커스텀훅으로 만들기
  const [filters, setFilters] = useState<FilterState>(initialFilter);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number | null>(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSelectSingle = (
    key: keyof Omit<FilterState, 'date' | 'foodType'>,
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const handleSelectMulti = (
    key: keyof Pick<FilterState, 'foodType'>,
    value: string
  ) => {
    setFilters(prev => {
      const current = prev[key] ?? [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: updated.length > 0 ? updated : null };
    });
  };

  const handleApplyDate = (date: SelectedDate, index: number) => {
    setFilters(prev => {
      const current = prev.date ?? [];
      const updated = [...current];
      updated[index] = date;
      return { ...prev, date: updated };
    });
  };

  const handleAddSchedule = () => {
    setFilters(prev => ({
      ...prev,
      date: [...(prev.date ?? []), { startDate: null, endDate: null }],
    }));
  };

  const handleResetFilter = () => {
    setFilters(initialFilter);
  };

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
    const cleanedFilters = {
      ...filters,
      date: filters.date.filter(date => date.startDate !== null),
    };
    alert(cleanedFilters);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' color='var(--color-grayscale-900)' />}
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
        <FilterChipGroup
          filterTitle='행사 종류'
          selectedOption={filters.eventType ?? ''}
          options={EVENT_TYPE}
          handleSelectFilter={value => handleSelectSingle('eventType', value)}
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

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
          buttonStyle={isEqual(filters, initialFilter) ? 'disabled' : 'active'}
          handleClickButton={handleApplyFilter}
        >
          적용
        </Button>
      </footer>
    </>
  );
}
