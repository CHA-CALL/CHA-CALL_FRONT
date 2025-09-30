import { type ChangeEvent } from 'react';
import type { FieldError } from 'react-hook-form';
import { MENU_TEXT } from '@pages/@owner/menu/constant/menu';
import ErrorText from '@components/error-text/ErrorText';

interface MenuPriceInputProps {
  value: string;
  error?: FieldError;
  onChange: (_value: string) => void;
}

export default function MenuPriceInput({
  value,
  error,
  onChange,
}: MenuPriceInputProps) {
  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <>
      <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>가격</span>
      <div className='mb-[2rem] rounded-[1.6rem] border border-grayscale-300 focus-within:border-grayscale-500'>
        <input
          type='text'
          inputMode='numeric'
          className='
            px-[2rem] py-[1.65rem] rounded-[1.6rem]
            body-m-14 text-grayscale-900 caret-primary-700
            placeholder:body-m-14 placeholder:text-grayscale-300
          '
          placeholder='텍스트를 입력해주세요.'
          value={value}
          onChange={handleChangePrice}
          maxLength={MENU_TEXT.PRICE_MAX_LENGTH}
        />
      </div>
      {error && (
        <div className='mt-[-1.8rem]'>
          <ErrorText text={error.message || ''} />
        </div>
      )}
    </>
  );
}