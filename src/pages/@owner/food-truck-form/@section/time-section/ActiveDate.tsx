import { useState } from 'react';
import BottomSheet from '@layout/bottom-sheet/BottomSheet';
import Calendar from '@components/calendar/Calendar';
import type { SelectedDate } from '@type/calendar-types';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import ButtonText from '@ui/button-text/ButtonText';
import ButtonDate from '@ui/button-date/ButtonDate';
import ErrorText from '@form/error-text/ErrorText';
import { useActiveDate } from '@pages/@owner/food-truck-form/hooks/use-active-date';

export default function ActiveDate() {
  const {
    availableDates,
    handleAddAvailableDate,
    updateAvailableDateById,
    removeAvailableDateById,
    availableDatesError,
  } = useActiveDate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedDate = availableDates.find(date => date.id === selectedId);

  return (
    <>
      <BottomSheet
        isOpen={isCalendarOpen}
        handleCloseBottomSheet={() => {
          setIsCalendarOpen(false);
        }}
        sheetHeight={490}
      >
        <Calendar
          selectedDate={{
            startDate:
              selectedId && selectedDate?.startDate
                ? new Date(selectedDate.startDate)
                : null,
            endDate:
              selectedId && selectedDate?.endDate
                ? new Date(selectedDate.endDate)
                : null,
          }}
          handleApplyDate={(date: SelectedDate) => {
            updateAvailableDateById(selectedId ?? '', {
              startDate: date.startDate?.toISOString().split('T')[0] ?? '',
              endDate: date.endDate?.toISOString().split('T')[0] ?? '',
            });
            setIsCalendarOpen(false);
          }}
          handleCloseBottomSheet={() => {
            setIsCalendarOpen(false);
          }}
          isOpen={isCalendarOpen}
        />
      </BottomSheet>
      <FormLayout
        isRequired={true}
        title='가능한 일정대'
        rightComponent={
          <ButtonText handleClick={handleAddAvailableDate}>
            일정 추가하기
          </ButtonText>
        }
      >
        {availableDates.length > 0 ? (
          availableDates.map(date => (
            <ButtonDate
              key={date.id}
              startDate={date.startDate ? new Date(date.startDate) : null}
              endDate={date.endDate ? new Date(date.endDate) : null}
              handleOpenCalendar={() => {
                setSelectedId(date.id);
                setIsCalendarOpen(true);
              }}
              handleDeleteSchedule={() => {
                removeAvailableDateById(date.id);
              }}
            />
          ))
        ) : (
          <ButtonDate
            startDate={null}
            endDate={null}
            handleOpenCalendar={() => {
              setSelectedId('default-date');
              setIsCalendarOpen(true);
            }}
            handleDeleteSchedule={() => {}}
          />
        )}
        {availableDatesError && <ErrorText text={availableDatesError} />}
      </FormLayout>
    </>
  );
}
