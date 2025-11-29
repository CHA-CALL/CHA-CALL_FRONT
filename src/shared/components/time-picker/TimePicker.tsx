import { useState } from 'react';
import Picker from 'react-mobile-picker';
import _ from 'lodash';
import Button from '@components/ui/button/Button';
import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';
import type { TimeType } from '@type/time-types';

interface TimePickerProps {
  timeTitle: string;
  time: TimeType | null;
  handleTimeChange: (_time: TimeType | null) => void;
}

const HOURS = _.range(0, 24).map(h => _.padStart(String(h), 2, '0'));
const MINUTES_STEP = 5;
const MINUTES = _.range(0, 60, MINUTES_STEP).map(m =>
  _.padStart(String(m), 2, '0')
);

export default function TimePicker({
  timeTitle,
  time,
  handleTimeChange,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTime, setSelectedTime] = useState({
    hour: time ? time.hour : '12',
    minute: time ? time.minute : '30',
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
    setSelectedTime({ hour: '12', minute: '30' });
  };

  return (
    <div className='flex w-full flex-col items-center gap-[0.4rem] rounded-[1.2rem] border border-grayscale-100 px-[1rem] py-[1.2rem]'>
      <button
        type='button'
        onClick={handleTimePickerOpenState}
        className='flex w-full items-center justify-between px-[1rem]'
      >
        <p className='text-grayscale-500 title-sb-12'>{timeTitle}</p>
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
            className={cn('transition-transform', isOpen ? '' : 'rotate-180')}
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
                  className={h === selectedTime.hour ? 'text-primary-700' : ''}
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
                  className={
                    m === selectedTime.minute ? 'text-primary-700' : ''
                  }
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
