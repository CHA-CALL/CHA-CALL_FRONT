import { useState } from 'react';
import { useTime } from '@pages/@owner/food-truck-form/hooks/use-time';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Calendar from '@shared/components/calendar/Calendar';
import type { SelectedDate } from '@shared/types/calendar-types';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import ButtonText from '@shared/components/button-text/ButtonText';
import ButtonDate from '@shared/components/button-date/ButtonDate';
import ErrorText from '@shared/components/error-text/ErrorText';

export default function ActiveDate() {
  const {
    availableDates,
    handleAddAvailableDate,
    updateAvailableDateById,
    removeAvailableDateById,
    availableDatesError,
  } = useTime();
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
            startDate: selectedId
              ? new Date(selectedDate?.startDate ?? '')
              : null,
            endDate: selectedId ? new Date(selectedDate?.endDate ?? '') : null,
          }}
          handleApplyDate={(date: SelectedDate) => {
            updateAvailableDateById(selectedId ?? '', {
              startDate: date.startDate?.toISOString() ?? '',
              endDate: date.endDate?.toISOString() ?? '',
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
