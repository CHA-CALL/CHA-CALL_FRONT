import FormLayout from '@components/layout/form-layout/FormLayout';
import TimePicker from '@components/time-picker/TimePicker';
import ButtonCheck from '@components/ui/button-check/ButtonCheck';
import ErrorText from '@form/error-text/ErrorText';
import type { TimeType } from '@type/time-types';

interface ActiveTimeHookResult {
  startActiveTime: TimeType | null;
  endActiveTime: TimeType | null;
  timeDiscussRequired?: boolean;
  activeTimeError?: string;
  updateStartActiveTime: (_time: TimeType | null) => void;
  updateEndActiveTime: (_time: TimeType | null) => void;
  updateTimeDiscussRequired?: (_timeDiscussRequired: boolean) => void;
}

interface ActiveTimeProps {
  useActiveTimeHook: () => ActiveTimeHookResult;
}

export default function ActiveTime({ useActiveTimeHook }: ActiveTimeProps) {
  const {
    startActiveTime,
    endActiveTime,
    activeTimeError,
    timeDiscussRequired,
    updateStartActiveTime,
    updateEndActiveTime,
    updateTimeDiscussRequired,
  } = useActiveTimeHook();

  return (
    <FormLayout
      isRequired={true}
      title='운영 가능 시간대'
      rightComponent={
        timeDiscussRequired !== undefined &&
        updateTimeDiscussRequired && (
          <div className='flex items-center gap-[0.4rem]'>
            <ButtonCheck
              isChecked={timeDiscussRequired}
              handleToggle={() =>
                updateTimeDiscussRequired(!timeDiscussRequired)
              }
            />
            <span className='text-grayscale-500 caption-m-12'>
              조율이 가능해요
            </span>
          </div>
        )
      }
    >
      <TimePicker
        timeTitle='운영 시작'
        time={startActiveTime}
        handleTimeChange={updateStartActiveTime}
      />
      <TimePicker
        timeTitle='운영 종료'
        time={endActiveTime}
        handleTimeChange={updateEndActiveTime}
      />
      {activeTimeError && <ErrorText text={activeTimeError} />}
    </FormLayout>
  );
}
