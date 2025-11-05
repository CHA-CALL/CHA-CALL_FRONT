import { useCategories } from '@pages/@owner/food-truck-form/hooks/use-categories';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import Button from '@ui/button/Button';
import { PAYMENT_METHOD } from '@constant/payment-method';

export default function PaymentMethod() {
  const { paymentMethod, updatePaymentMethod } = useCategories();
  return (
    <FormLayout isRequired={true} title='결제 방법'>
      <div className='flex flex-wrap gap-[0.8rem]'>
        {Object.values(PAYMENT_METHOD).map(item => (
          <Button
            buttonStyle={paymentMethod === item ? 'selected2' : 'default'}
            handleClickButton={() => updatePaymentMethod(item)}
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
