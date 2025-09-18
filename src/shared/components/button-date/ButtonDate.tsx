import React from 'react';
import { Icon } from '@shared/components/icon/Icon';
import { dateFormatter } from '@shared/utils/date-formatter';
import { cn } from '@shared/utils/cn';
import type { SelectedDate } from '@shared/types/calendar-types';

interface ButtonDateProps
  extends SelectedDate,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleOpenCalendar: () => void;
  startDate: Date | null;
  endDate: Date | null;
}

export default function ButtonDate({
  handleOpenCalendar,
  className,
  startDate,
  endDate,
  ...props
}: ButtonDateProps) {
  return (
    <button
      type='button'
      className={cn(
        'border-grayscale-300 flex h-[5.4rem] w-full flex-row items-center gap-[1.2rem] rounded-[1.6rem] border px-[2rem]',
        className
      )}
      onClick={handleOpenCalendar}
      {...props}
    >
      <Icon name='ic_calendar' color={startDate ? '#565B65' : '#CCCED5'} />
      <div className='flex flex-row items-center gap-[0.4rem]'>
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
            <Icon name='ic_dash' color='#838992' />
            <span className='text-grayscale-700 body-m-14'>
              {dateFormatter(endDate)}
            </span>
          </>
        )}
      </div>
    </button>
  );
}
