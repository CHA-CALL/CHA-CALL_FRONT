import FormLayout from '@components/layout/form-layout/FormLayout';
import ErrorText from '@form/error-text/ErrorText';
import TimePicker from '@components/ui/time-picker/TimePicker';

interface ActiveTimeProps {
  activeTime: {
    startActiveTime: string;
    endActiveTime: string;
  };
  updateStartActiveTime: (_startActiveTime: string) => void;
  updateEndActiveTime: (_endActiveTime: string) => void;
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
        value={activeTime.startActiveTime}
        handleChange={startActiveTime => updateStartActiveTime(startActiveTime)}
        timeTitle='운영 시작'
      />
      <TimePicker
        value={activeTime.endActiveTime}
        handleChange={endActiveTime => updateEndActiveTime(endActiveTime)}
        timeTitle='운영 종료'
      />
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
