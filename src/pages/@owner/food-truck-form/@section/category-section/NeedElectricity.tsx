import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Button from '@ui/button/Button';
import { NEED_ELECTRICITY } from '@constant/need-electricity';
import { useCategories } from '@pages/@owner/food-truck-form/hooks/use-categories';

export default function NeedElectricity() {
  const { needElectricity, updateNeedElectricity } = useCategories();
  return (
    <FormLayout isRequired={true} title='전기 사용 여부'>
      <div className='flex flex-wrap gap-[0.8rem]'>
        {Object.values(NEED_ELECTRICITY).map(item => (
          <Button
            buttonStyle={needElectricity === item ? 'selected2' : 'default'}
            handleClickButton={() => updateNeedElectricity(item)}
            variant='chip'
            key={item}
          >
            {item}
          </Button>
        ))}
      </div>
    </FormLayout>
  );
}
