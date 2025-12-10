import { useState } from 'react';

import Calendar from '@components/calendar/Calendar';
import BottomSheet from '@components/layout/bottom-sheet/BottomSheet';
import FormLayout from '@components/layout/form-layout/FormLayout';
import ButtonText from '@components/ui/button-text/ButtonText';
import ButtonDate from '@components/ui/button-date/ButtonDate';
import ErrorText from '@components/form/error-text/ErrorText';
import type { AvailableDate } from '@type/available-date';
import type { SelectedDate } from '@type/calendar-types';
import { DEFAULT_DATE } from '@components/active-date/constant/default-date';
import { formatDateToDot } from '@utils/date/date-formatter';

interface ActiveDateHookResult {
  availableDates: AvailableDate[];
  updateAvailableDateById: (_dateData: AvailableDate) => void;
  removeAvailableDateById: (_id: string) => void;
  handleAddAvailableDate: () => void;
  availableDatesError?: string;
}

interface ActiveDateProps {
  useActiveDateHook: () => ActiveDateHookResult;
}

export default function ActiveDate({ useActiveDateHook }: ActiveDateProps) {
  const {
    availableDates,
    handleAddAvailableDate,
    updateAvailableDateById,
    removeAvailableDateById,
    availableDatesError,
  } = useActiveDateHook();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedDate = availableDates.find(date => date.id === selectedId);

  const handleOpenCalendar = (dateId: string) => {
    setSelectedId(dateId);
    setIsCalendarOpen(true);
  };
  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleApplyDate = (date: SelectedDate) => {
    if (!selectedId) return;
    updateAvailableDateById({
      id: selectedId,
      startDate: formatDateToDot(date.startDate),
      endDate: formatDateToDot(date.endDate),
    });
    setIsCalendarOpen(false);
  };

  return (
    <>
      <BottomSheet
        isOpen={isCalendarOpen}
        handleCloseBottomSheet={handleCloseCalendar}
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
          handleApplyDate={handleApplyDate}
          handleCloseBottomSheet={handleCloseCalendar}
          isOpen={isCalendarOpen}
        />
      </BottomSheet>
      <FormLayout
        isRequired
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
              handleOpenCalendar={() => handleOpenCalendar(date.id)}
              handleDeleteSchedule={() => removeAvailableDateById(date.id)}
            />
          ))
        ) : (
          <ButtonDate
            startDate={null}
            endDate={null}
            handleOpenCalendar={() => handleOpenCalendar(DEFAULT_DATE)}
            handleDeleteSchedule={() => {}}
          />
        )}
        {availableDatesError && <ErrorText text={availableDatesError} />}
      </FormLayout>
    </>
  );
}
