import { cn } from '@shared/utils/cn';

import { Icon } from '../icon/Icon';
import dateFormatter from '@shared/utils/date-formatter';

interface ButtonDateProps {
  startDate: Date | null;
  endDate?: Date | null;
  handleOpenCalendar: () => void;
}

export default function ButtonDate({
  startDate = null,
  endDate = null,
  handleOpenCalendar,
}: ButtonDateProps) {
  return (
    <button
      className='w-full px-[2rem] h-[5.4rem] flex flex-row items-center gap-[1.2rem] border border-grayscale-300 rounded-[1.6rem]'
      onClick={handleOpenCalendar}
    >
      <Icon name='ic_calendar' color={startDate ? '#565B65' : '#CCCED5'} />
      <div className='flex flex-row items-center gap-[0.4rem]'>
        <span
          className={cn(
            'body-m-14 text-grayscale-700',
            !startDate && 'text-grayscale-300'
          )}
        >
          {startDate ? dateFormatter(startDate) : '일정을 선택해 주세요.'}
        </span>
        {startDate && endDate && (
          <>
            <Icon name='ic_dash' color='#838992' />
            <span className='body-m-14 text-grayscale-700'>
              {dateFormatter(endDate)}
            </span>
          </>
        )}
      </div>
    </button>
  );
}
