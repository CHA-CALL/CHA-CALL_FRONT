import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import { useTime } from '@pages/@owner/food-truck-form/hooks/use-time';
import ButtonCheck from '@shared/components/button-check/ButtonCheck';
import ErrorText from '@shared/components/error-text/ErrorText';
import TimePicker from '@pages/@owner/food-truck-form/components/TimePicker';

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
          <span className='caption-m-12 text-grayscale-500'>
            조율이 가능해요
          </span>
        </div>
      }
    >
      <TimePicker
        value={startActiveTime}
        handleChange={updateActiveTimeStart}
        timeTitle='시간을 선택해주세요.'
      />
      <TimePicker
        value={endActiveTime}
        handleChange={updateActiveTimeEnd}
        timeTitle='시간을 선택해주세요.'
      />
      {activeTimeError && <ErrorText text={activeTimeError} />}
    </FormLayout>
  );
}
