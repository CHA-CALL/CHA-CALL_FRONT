import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import { useTime } from '@pages/@owner/food-truck-form/hooks/use-time';
import ButtonCheck from '@ui/button-check/ButtonCheck';
import ErrorText from '@form/error-text/ErrorText';
import TimePicker from '@components/TimePicker/TimePicker';

export default function ActiveTime() {
  const {
    startActiveTime,
    endActiveTime,
    timeDiscussRequired,
    activeTimeError,
    updateActiveTimeStart,
    updateActiveTimeEnd,
    updateTimeDiscussRequired,
  } = useTime();
  return (
    <FormLayout
      isRequired={true}
      title='운영 가능 시간대'
      rightComponent={
        <div className='flex items-center gap-[0.4rem]'>
          <ButtonCheck
            isChecked={timeDiscussRequired}
            handleToggle={() => updateTimeDiscussRequired(!timeDiscussRequired)}
          />
          <span className='text-grayscale-500 caption-m-12'>
            조율이 가능해요
          </span>
        </div>
      }
    >
      <TimePicker
        timeTitle='운영 시작'
        time={startActiveTime}
        handleTimeChange={updateActiveTimeStart}
      />
      <TimePicker
        timeTitle='운영 종료'
        time={endActiveTime}
        handleTimeChange={updateActiveTimeEnd}
      />
      {activeTimeError && <ErrorText text={activeTimeError} />}
    </FormLayout>
  );
}
