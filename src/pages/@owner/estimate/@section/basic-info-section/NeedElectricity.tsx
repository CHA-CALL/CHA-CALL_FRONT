import FormLayout from '@components/layout/form-layout/FormLayout';
import Button from '@ui/button/Button';
import ErrorText from '@components/form/error-text/ErrorText';

interface NeedElectricityProps {
  needElectricity: boolean;
  updateNeedElectricity: (_needElectricity: boolean) => void;
  error?: string;
}
export default function NeedElectricity({
  needElectricity,
  updateNeedElectricity,
  error,
}: NeedElectricityProps) {
  return (
    <FormLayout isRequired={true} title='전기 사용 여부'>
      <div className='flex flex-wrap gap-[0.8rem]'>
        <Button
          variant='chip'
          buttonStyle={needElectricity === true ? 'selected2' : 'default'}
          handleClickButton={() => updateNeedElectricity(true)}
        >
          필요
        </Button>
        <Button
          variant='chip'
          buttonStyle={needElectricity === false ? 'selected2' : 'default'}
          handleClickButton={() => updateNeedElectricity(false)}
        >
          필요 없음
        </Button>
      </div>
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
