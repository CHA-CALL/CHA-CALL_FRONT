import React from 'react';
import { Icon } from '@icon/Icon';
import { dateFormatter } from '@utils/date-formatter';
import { cn } from '@utils/cn';
import type { SelectedDate } from '@type/calendar-types';

interface ButtonDateProps
  extends SelectedDate,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleOpenCalendar: () => void;
  startDate: Date | null;
  endDate: Date | null;
  handleDeleteSchedule: () => void;
}

export default function ButtonDate({
  handleOpenCalendar,
  className,
  startDate,
  endDate,
  handleDeleteSchedule,
  ...props
}: ButtonDateProps) {
  const handleCloseButton = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleDeleteSchedule();
  };
  return (
    <button
      type='button'
      className={cn(
        'flex h-[5.4rem] w-full flex-row items-center gap-[1.2rem] rounded-[1.6rem] border border-grayscale-300 px-[2rem]',
        className
      )}
      onClick={handleOpenCalendar}
      {...props}
    >
      <Icon
        name='ic_calendar'
        className={startDate ? 'text-grayscale-700' : 'text-grayscale-300'}
      />
      <div className='flex w-full flex-row items-center justify-between gap-[0.4rem]'>
        <div className='flex items-center'>
          <span
            className={cn(
              'text-grayscale-700 body-m-14',
              !startDate && 'text-grayscale-300'
            )}
          >
            {startDate ? dateFormatter(startDate) : '일정을 선택해 주세요.'}
          </span>
          {startDate && endDate && (
            <>
              <Icon name='ic_dash' className='text-grayscale-500' />
              <span className='text-grayscale-700 body-m-14'>
                {dateFormatter(endDate)}
              </span>
            </>
          )}
        </div>
        {startDate && (
          <Icon
            name='ic_close'
            className='text-grayscale-500'
            onClick={handleCloseButton}
            role='button'
            aria-label='일정 삭제'
          />
        )}
      </div>
    </button>
  );
}
