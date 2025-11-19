import { useState } from 'react';

import BottomSheet from '@layout/bottom-sheet/BottomSheet';
import Calendar from '@components/calendar/Calendar';
import type { SelectedDate } from '@type/calendar-types';
import FormLayout from '@components/layout/form-layout/FormLayout';
import ButtonText from '@ui/button-text/ButtonText';
import ButtonDate from '@ui/button-date/ButtonDate';
import ErrorText from '@form/error-text/ErrorText';
import type { AvailableDate } from '@type/available-date';
import { dateFormatter } from '@shared/utils/date-formatter';

interface ActiveDateProps {
  availableDates: AvailableDate[];
  updateAvailableDateById: (_id: string, _dateData: AvailableDate) => void;
  removeAvailableDateById: (_id: string) => void;
  handleAddAvailableDate: () => string | null;
  error?: string;
}

export default function ActiveDate({
  availableDates,
  updateAvailableDateById,
  error,
  removeAvailableDateById,
  handleAddAvailableDate,
}: ActiveDateProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedDate = availableDates.find(date => date.id === selectedId);

  const openCalendarForNewDate = () => {
    const newId = handleAddAvailableDate();
    if (!newId) return;

    setSelectedId(newId);
    setIsCalendarOpen(true);
  };
  const openCalendarForExistingDate = (id: string) => {
    setSelectedId(id);
    setIsCalendarOpen(true);
  };
  const handleCalendarApplyDate = (date: SelectedDate) => {
    if (!selectedId) {
      setIsCalendarOpen(false);
      return;
    }

    updateAvailableDateById(selectedId, {
      id: selectedId,
      startDate: date.startDate ? dateFormatter(new Date(date.startDate)) : '',
      endDate: date.endDate ? dateFormatter(new Date(date.endDate)) : '',
    });

    setIsCalendarOpen(false);
  };

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
          handleApplyDate={handleCalendarApplyDate}
          handleCloseBottomSheet={() => {
            setIsCalendarOpen(false);
          }}
          isOpen={isCalendarOpen}
        />
      </BottomSheet>

      <FormLayout
        isRequired={true}
        title='일정'
        rightComponent={
          <ButtonText handleClick={openCalendarForNewDate}>
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
              handleOpenCalendar={() => openCalendarForExistingDate(date.id)}
              handleDeleteSchedule={() => {
                removeAvailableDateById(date.id);
              }}
            />
          ))
        ) : (
          <ButtonDate
            startDate={null}
            endDate={null}
            handleOpenCalendar={openCalendarForNewDate}
            handleDeleteSchedule={() => {}}
          />
        )}
        {error && <ErrorText text={error} />}
      </FormLayout>
    </>
  );
}
