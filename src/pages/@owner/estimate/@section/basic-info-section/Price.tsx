import FormLayout from '@components/layout/form-layout/FormLayout';
import Input from '@ui/input/Input';
import ErrorText from '@form/error-text/ErrorText';
import { formatPrice } from '@utils/price-formatter';

interface PriceProps {
  price: number;
  updatePrice: (price: string) => void;
  error?: string;
}
export default function Price({ price, updatePrice, error }: PriceProps) {
  return (
    <FormLayout isRequired={true} title='금액'>
      <Input
        placeholder='텍스트를 입력해주세요'
        error={!!error}
        value={formatPrice(price)}
        onChange={e => updatePrice(e.target.value)}
      />
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
