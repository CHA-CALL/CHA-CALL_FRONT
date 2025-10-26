import { useState } from 'react';
import { useTime } from '@pages/@owner/food-truck-form/hooks/use-time';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Calendar from '@shared/components/calendar/Calendar';
import type { SelectedDate } from '@shared/types/calendar-types';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import ButtonText from '@shared/components/button-text/ButtonText';
import InputButton from '@pages/@owner/food-truck-form/components/InputButton';
import { dateFormatter } from '@shared/utils/date-formatter';
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
            <InputButton
              key={date.id}
              id={date.id}
              iconId='ic_calendar'
              text={
                date.startDate
                  ? `${dateFormatter(new Date(date.startDate))}` +
                    (date.endDate
                      ? `- ${dateFormatter(new Date(date.endDate))}`
                      : '')
                  : '일정을 선택해주세요.'
              }
              handleClick={() => {
                setSelectedId(date.id);
                setIsCalendarOpen(true);
              }}
              handleRemove={event => removeAvailableDateById(event, date.id)}
              isRemovable={!!date.startDate}
            />
          ))
        ) : (
          <InputButton
            id='default-date'
            iconId='ic_calendar'
            text='일정을 선택해주세요.'
            handleClick={() => {
              setSelectedId('default-date');
              setIsCalendarOpen(true);
            }}
            isRemovable={false}
          />
        )}
        {availableDatesError && <ErrorText text={availableDatesError} />}
      </FormLayout>
    </>
  );
}
