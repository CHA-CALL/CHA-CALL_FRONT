import FormLayout from '@components/layout/form-layout/FormLayout';
import TimePicker from '@components/time-picker/TimePicker';
import ErrorText from '@form/error-text/ErrorText';
import type { TimeType } from '@type/time-types';

interface ActiveTimeProps {
  activeTime: {
    startActiveTime: TimeType | null;
    endActiveTime: TimeType | null;
  };
  updateStartActiveTime: (_startActiveTime: TimeType | null) => void;
  updateEndActiveTime: (_endActiveTime: TimeType | null) => void;
  error?: string;
}
export default function ActiveTime({
  activeTime,
  updateStartActiveTime,
  updateEndActiveTime,
  error,
}: ActiveTimeProps) {
  return (
    <FormLayout isRequired={true} title='운영 가능 시간대'>
      <TimePicker
        timeTitle='운영 시작'
        time={activeTime.startActiveTime}
        handleTimeChange={updateStartActiveTime}
      />
      <TimePicker
        timeTitle='운영 종료'
        time={activeTime.endActiveTime}
        handleTimeChange={updateEndActiveTime}
      />
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
