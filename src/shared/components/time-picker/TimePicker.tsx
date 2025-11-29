import { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import Button from '@components/ui/button/Button';
import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';
import type { TimeType } from '@type/time-types';
import { HOURS, DEFAULT_TIME, MINUTES } from '@constant/time-selections';

interface TimePickerProps {
  timeTitle: string;
  time: TimeType | null;
  handleTimeChange: (_time: TimeType | null) => void;
}

export default function TimePicker({
  timeTitle,
  time,
  handleTimeChange,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTime, setSelectedTime] = useState({
    hour: time ? time.hour : DEFAULT_TIME.hour,
    minute: time ? time.minute : DEFAULT_TIME.minute,
  });

  const handleTimePickerOpenState = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirmTime = () => {
    handleTimeChange(selectedTime);
    handleTimePickerOpenState();
  };

  const handleResetTime = () => {
    handleTimeChange(null);
    setSelectedTime(DEFAULT_TIME);
  };

  useEffect(() => {
    if (time) {
      setSelectedTime(time);
    }
  }, [time]);

  return (
    <div className='flex w-full flex-col items-center gap-[0.4rem] rounded-[1.2rem] border border-grayscale-100 px-[1rem] py-[1.2rem]'>
      <button
        type='button'
        onClick={handleTimePickerOpenState}
        className='flex w-full items-center justify-between px-[1rem]'
      >
        <p className='title-sb-00 text-grayscale-500'>{timeTitle}</p>
        <div className='flex items-center gap-[1.2rem]'>
          <span
            className={cn(
              'body-m-16',
              isOpen && time ? 'text-primary-700' : 'text-grayscale-700'
            )}
          >
            {time ? (
              <div className='flex items-center gap-[0.2rem]'>
                <span>{time.hour}</span>
                <span>:</span>
                <span>{time.minute}</span>
              </div>
            ) : (
              timeTitle
            )}
          </span>
          <Icon
            name='ic_up'
            className={cn('transition-transform', !isOpen && 'rotate-180')}
          />
        </div>
      </button>
      {isOpen && (
        <>
          <Picker
            value={selectedTime}
            onChange={setSelectedTime}
            // 데스크톱 휠 동작. normal일 때가 window 기준 기본 스크롤
            wheelMode='normal'
            height={145}
            itemHeight={44}
            className='w-[24rem] font-semibold body-m-16'
          >
            <Picker.Column name='hour'>
              {HOURS.map(h => (
                <Picker.Item
                  key={h}
                  value={h}
                  className={`${h === selectedTime.hour && 'text-primary-700'}`}
                >
                  {h}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name='minute'>
              {MINUTES.map(m => (
                <Picker.Item
                  key={m}
                  value={m}
                  className={`${m === selectedTime.minute && 'text-primary-700'}`}
                >
                  {m}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>

          <div className='flex w-full flex-row gap-[1.8rem] px-[1rem]'>
            <Button variant='cta' buttonStyle='sub' onClick={handleResetTime}>
              초기화
            </Button>
            <Button
              variant='cta'
              buttonStyle='active'
              onClick={handleConfirmTime}
            >
              확인
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
