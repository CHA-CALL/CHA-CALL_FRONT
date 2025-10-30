import { useState, useEffect } from 'react';
import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface TimePickerProps {
  value?: string;
  handleChange?: (_time: string) => void;
  timeTitle?: string;
  className?: string;
}
interface TimePickerItemProps {
  time: string;
  isSelected: boolean;
  handleClick: () => void;
}

function TimePickerItem({
  time,
  isSelected,
  handleClick,
}: TimePickerItemProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'body-m-16 text-grayscale-500 px-[1.2rem] py-[0.8rem]',
        isSelected && 'text-primary-700'
      )}
    >
      {time}
    </button>
  );
}

export default function TimePicker({
  value = '',
  handleChange,
  timeTitle = '시간을 선택해주세요',
  className = '',
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
  const HOURS = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const MINUTES = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  }, [value]);

  const handleTimeChange = (type: 'hour' | 'minute', newValue: string) => {
    if (type === 'hour') {
      setSelectedHour(newValue);
      setSelectedMinute(null);
    } else if (type === 'minute') {
      setSelectedMinute(newValue);
      handleChange?.(`${selectedHour}:${newValue}`);
    }
  };

  return (
    <div
      className={cn(
        'border-grayscale-100 flexw-full flex-col gap-[1.6rem] rounded-[1.2rem] border',
        className
      )}
    >
      {/* 선택된 시간 표시 */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between px-[2rem] py-[1.2rem]'
      >
        <p className='title-sb-12 text-grayscale-500'>{timeTitle}</p>
        <div className='flex items-center gap-[1.2rem]'>
          <span
            className={cn(
              'body-m-14',
              isOpen && value ? 'text-primary-700' : 'text-grayscale-700'
            )}
          >
            {selectedHour && selectedMinute ? (
              <div className='body-m-16 flex items-center gap-[0.2rem]'>
                <span>{selectedHour}</span>
                <span>:</span>
                <span>{selectedMinute}</span>
              </div>
            ) : (
              timeTitle
            )}
          </span>
          <Icon
            name='ic_up'
            className={cn('transition-transform', isOpen ? 'rotate-180' : '')}
          />
        </div>
      </button>
      {isOpen && (
        <div className='flex items-center justify-center gap-[1.8rem] py-[3rem]'>
          {/* 시간 선택 */}
          <div className='scrollbar-hide flex max-h-[8.4rem] flex-col items-center overflow-y-auto'>
            <div className='flex flex-col gap-[0.4rem]'>
              {HOURS.map(hour => (
                <TimePickerItem
                  key={hour}
                  time={hour}
                  isSelected={selectedHour === hour}
                  handleClick={() => handleTimeChange('hour', hour)}
                />
              ))}
            </div>
          </div>

          {/* 분 선택 */}
          <div className='scrollbar-hide flex max-h-[8.4rem] flex-col items-center overflow-y-auto'>
            <div className='flex flex-col gap-[0.4rem]'>
              {MINUTES.map(minute => (
                <TimePickerItem
                  key={minute}
                  time={minute}
                  isSelected={selectedMinute === minute}
                  handleClick={() => handleTimeChange('minute', minute)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
