import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import { useTime } from '@pages/@owner/food-truck-form/hooks/use-time';
import ButtonCheck from '@shared/components/button-check/ButtonCheck';

export default function ActiveTime() {
  const { timeDiscussRequired, updateTimeDiscussRequired } = useTime();
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
      <></>
    </FormLayout>
  );
}
