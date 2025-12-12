import { useEffect, useState } from 'react';

import type { TimeType } from '@type/time-types';

interface UseActiveTimeProps {
  formActiveTime: string;
  formTimeDiscussRequired?: boolean;
  handleActiveTimeSetValue: (_value: string) => void;
  handleTimeDiscussRequiredSetValue?: (_value: boolean) => void;
}

export const useActiveTime = ({
  formActiveTime,
  formTimeDiscussRequired,
  handleActiveTimeSetValue,
  handleTimeDiscussRequiredSetValue,
}: UseActiveTimeProps) => {
  const [startActiveTime, setStartActiveTime] = useState<TimeType | null>(null);
  const [endActiveTime, setEndActiveTime] = useState<TimeType | null>(null);

  const updateStartActiveTime = (activeTime: TimeType | null) => {
    setStartActiveTime(activeTime);
  };
  const updateEndActiveTime = (activeTime: TimeType | null) => {
    setEndActiveTime(activeTime);
  };

  useEffect(() => {
    const start =
      startActiveTime != null
        ? `${startActiveTime.hour}:${startActiveTime.minute}`
        : '';
    const end =
      endActiveTime != null
        ? `${endActiveTime.hour}:${endActiveTime.minute}`
        : '';

    handleActiveTimeSetValue(`${start}-${end}`);
  }, [startActiveTime, endActiveTime, handleActiveTimeSetValue]);

  useEffect(() => {
    if (!formActiveTime) {
      setStartActiveTime(null);
      setEndActiveTime(null);
      return;
    }

    const [startTime, endTime] = formActiveTime.split('-');
    if (!startTime && !endTime) {
      setStartActiveTime(null);
      setEndActiveTime(null);
      return;
    }

    const [startHour, startMinute] = (startTime ?? '').split(':');
    const [endHour, endMinute] = (endTime ?? '').split(':');

    if (startHour && startMinute) {
      setStartActiveTime(prev =>
        prev?.hour === startHour && prev?.minute === startMinute
          ? prev
          : { hour: startHour, minute: startMinute }
      );
    } else {
      setStartActiveTime(null);
    }

    if (endHour && endMinute) {
      setEndActiveTime(prev =>
        prev?.hour === endHour && prev?.minute === endMinute
          ? prev
          : { hour: endHour, minute: endMinute }
      );
    } else {
      setEndActiveTime(null);
    }
  }, [formActiveTime]);

  const updateTimeDiscussRequired = (timeDiscussRequired: boolean) => {
    if (handleTimeDiscussRequiredSetValue)
      handleTimeDiscussRequiredSetValue(timeDiscussRequired);
  };

  return {
    // Data
    startActiveTime,
    endActiveTime,
    timeDiscussRequired: formTimeDiscussRequired,

    // Actions
    updateStartActiveTime,
    updateEndActiveTime,
    updateTimeDiscussRequired,
  };
};
