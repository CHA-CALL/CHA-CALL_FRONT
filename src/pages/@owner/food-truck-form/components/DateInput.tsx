import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface DateInputProps {
  startDate: string;
  endDate: string;
  handleClick: () => void;
}

export default function DateInput({
  startDate,
  endDate,
  handleClick,
}: DateInputProps) {
  return (
    <div
      onClick={handleClick}
      className='border-grayscale-300 flex cursor-pointer items-center gap-[1.2rem] rounded-[1.6rem] border px-[2rem] py-[1.6rem]'
    >
      <Icon
        name='ic_calendar'
        className={cn(startDate ? 'text-grayscale-700' : 'text-grayscale-300')}
      />
      <div className='body-m-14 flex items-center gap-[0.4rem] text-gray-700'>
        {!startDate && !endDate && (
          <span className='text-grayscale-500'>일정을 선택해 주세요.</span>
        )}
        <span>{startDate}</span>
        {endDate && <Icon name='ic_dash' />}
        <span>{endDate}</span>
      </div>
    </div>
  );
}
