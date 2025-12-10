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
import type { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import type { ESTIMATE_ERROR_MESSAGE } from '@pages/@owner/estimate/constants/estimate';
import { useActiveDate } from './hooks/use-active-date';

interface ActiveDateProps {
  formAvailableDates: AvailableDate[];
  availableDatesError?: string;
  errorMessages:
    | typeof FOOD_TRUCK_ERROR_MESSAGE
    | typeof ESTIMATE_ERROR_MESSAGE;
  maxLength: number;
  handleActiveDateSetValue: (_value: AvailableDate[]) => void;
  handleActiveDateError: (_message: string) => void;
}

export default function ActiveDate({
  formAvailableDates,
  availableDatesError,
  errorMessages,
  maxLength,
  handleActiveDateSetValue,
  handleActiveDateError,
}: ActiveDateProps) {
  const {
    availableDates,
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
  } = useActiveDate({
    formAvailableDates,
    errorMessages,
    maxLength,
    handleActiveDateSetValue,
    handleActiveDateError,
  });

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
