import FormLayout from '@components/layout/form-layout/FormLayout';
import TimePicker from '@components/time-picker/TimePicker';
import ButtonCheck from '@components/ui/button-check/ButtonCheck';
import ErrorText from '@form/error-text/ErrorText';
import { useActiveTime } from './hooks/use-active-time';
import type { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import type { ESTIMATE_ERROR_MESSAGE } from '@pages/@owner/estimate/constants/estimate';

interface ActiveTimeProps {
  formActiveTime: string;
  formTimeDiscussRequired?: boolean;
  activeTimeError?: string;
  errorMessages:
    | typeof FOOD_TRUCK_ERROR_MESSAGE
    | typeof ESTIMATE_ERROR_MESSAGE;
  handleActiveTimeError: (_message: string) => void;
  handleActiveTimeSetValue: (_value: string) => void;
  handleTimeDiscussRequiredSetValue?: (_value: boolean) => void;
}

export default function ActiveTime({
  formActiveTime,
  formTimeDiscussRequired,
  activeTimeError,
  errorMessages,
  handleActiveTimeError,
  handleActiveTimeSetValue,
  handleTimeDiscussRequiredSetValue,
}: ActiveTimeProps) {
  const {
    startActiveTime,
    endActiveTime,
    timeDiscussRequired,
    updateStartActiveTime,
    updateEndActiveTime,
    updateTimeDiscussRequired,
  } = useActiveTime({
    formActiveTime,
    formTimeDiscussRequired,
    errorMessages,
    handleActiveTimeError,
    handleActiveTimeSetValue,
    handleTimeDiscussRequiredSetValue,
  });

  return (
    <FormLayout
      isRequired
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
