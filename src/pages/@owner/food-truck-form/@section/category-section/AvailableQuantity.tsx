import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Button from '@shared/components/ui/button/Button';
import { AVAILABLE_QUANTITY } from '@shared/constant/available-quantity';
import { useCategories } from '@pages/@owner/food-truck-form/hooks/use-categories';

export default function AvailableQuantity() {
  const { availableQuantity, updateAvailableQuantity } = useCategories();
  return (
    <FormLayout isRequired={true} title='제조 가능 수량'>
      <div className='flex flex-wrap gap-[0.8rem]'>
        {Object.values(AVAILABLE_QUANTITY).map(item => (
          <Button
            buttonStyle={availableQuantity === item ? 'selected2' : 'default'}
            handleClickButton={() => updateAvailableQuantity(item)}
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
