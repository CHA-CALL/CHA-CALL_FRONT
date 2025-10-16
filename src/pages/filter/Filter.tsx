import { cn } from '@utils/cn';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import ButtonText from '@components/button-text/ButtonText';
import BottomSheet from '@components/bottom-sheet/BottomSheet';
import Calendar from '@components/calendar/Calendar';
import Button from '@components/button/Button';
import ButtonDate from '@components/button-date/ButtonDate';
import {
  AVAILABLE_QUANTITY,
  FOOD_TRUCK_CATEGORIES,
  NEED_ELECTRICITY,
  PAYMENT_METHOD,
} from '@shared/constant/categories';
import FilterChipGroup from '@pages/filter/components/FilterChipGroup';
import useFilterLogic from '@pages/filter/hooks/use-filter-logic';
import type {
  AvailableQuantityValue,
  FoodTruckCategoryValue,
  NeedElectricityValue,
  PaymentMethodValue,
} from '@shared/types/category-types';
import { omit } from 'lodash';

export default function Filter() {
  const {
    localFilters,
    isBottomSheetOpen,
    currentDateIndex,
    notFiltered,
    handleGoBack,
    handleSelectSingle,
    handleSelectMulti,
    handleApplyDate,
    handleAddSchedule,
    handleResetFilter,
    handleOpenCalendar,
    handleCloseCalendar,
    handleApplyFilter,
  } = useFilterLogic();

  const CATEGORY_WITHOUT_ALL = omit(FOOD_TRUCK_CATEGORIES, 'ALL');

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
          {localFilters.schedules.map((schedule, index) => (
            <ButtonDate
              key={index}
              startDate={schedule.startDate}
              endDate={schedule.endDate}
              handleOpenCalendar={() => handleOpenCalendar(index)}
            />
          ))}
        </div>
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup<AvailableQuantityValue>
          filterTitle='수량'
          selectedOption={localFilters.availableQuantity ?? ''}
          options={AVAILABLE_QUANTITY}
          handleSelectFilter={value =>
            handleSelectSingle('availableQuantity', value)
          }
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup<FoodTruckCategoryValue>
          filterTitle='음식 종류'
          selectedOption={localFilters.categories ?? []}
          options={CATEGORY_WITHOUT_ALL}
          multiSelectable
          handleSelectFilter={value => handleSelectMulti('categories', value)}
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup<NeedElectricityValue>
          filterTitle='전기 사용'
          selectedOption={localFilters.needElectricity ?? ''}
          options={NEED_ELECTRICITY}
          handleSelectFilter={value =>
            handleSelectSingle('needElectricity', value)
          }
        />
        <div className='h-[0.1rem] w-full bg-grayscale-100' />

        <FilterChipGroup<PaymentMethodValue>
          filterTitle='결제 방법'
          selectedOption={localFilters.paymentMethod ?? ''}
          options={PAYMENT_METHOD}
          handleSelectFilter={value =>
            handleSelectSingle('paymentMethod', value)
          }
        />
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseCalendar}
        sheetHeight={490}
      >
        {currentDateIndex !== null && (
          <Calendar
            selectedDate={
              localFilters.schedules?.[currentDateIndex] ?? {
                startDate: null,
                endDate: null,
              }
            }
            handleApplyDate={date => handleApplyDate(date, currentDateIndex)}
            handleCloseBottomSheet={handleCloseCalendar}
            isOpen={isBottomSheetOpen}
          />
        )}
      </BottomSheet>

      <footer
        className={cn(
          'fixed bottom-[0rem] w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]',
          'shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)]'
        )}
      >
        <Button
          variant='cta'
          buttonStyle={notFiltered ? 'disabled' : 'active'}
          handleClickButton={handleApplyFilter}
        >
          적용
        </Button>
      </footer>
    </>
  );
}
