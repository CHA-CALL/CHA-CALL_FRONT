import FormLayout from '@components/layout/form-layout/FormLayout';
import Button from '@ui/button/Button';
import {
  NEED_ELECTRICITY,
  type NeedElectricityKey,
} from '@constant/need-electricity';
import ErrorText from '@components/form/error-text/ErrorText';

interface NeedElectricityProps {
  needElectricity: NeedElectricityKey;
  updateNeedElectricity: (_needElectricity: NeedElectricityKey) => void;
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
        {Object.keys(NEED_ELECTRICITY).map(item => {
          const key = item as NeedElectricityKey;
          return (
            <Button
              buttonStyle={needElectricity === key ? 'selected2' : 'default'}
              handleClickButton={() => updateNeedElectricity(key)}
              variant='chip'
              key={key}
            >
              {NEED_ELECTRICITY[key]}
            </Button>
          );
        })}
      </div>
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
