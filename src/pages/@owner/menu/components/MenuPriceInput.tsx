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
  const handleChangePrice = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>가격</span>
      <textarea
        className='
          h-[5.6rem] mb-[2rem] px-[2rem] py-[1.65rem] rounded-[1.6rem]
          body-m-14 text-grayscale-900 border-grayscale-300 caret-primary-700
          placeholder:body-m-14 placeholder:text-grayscale-300
          focus:border-grayscale-500 focus:outline-none
        '
        placeholder='텍스트를 입력해주세요.'
        value={value}
        onChange={handleChangePrice}
        maxLength={MENU_TEXT.PRICE_MAX_LENGTH}
      />
      {error && (
        <div className='mt-[-1.8rem]'>
          <ErrorText text={error.message || ''} />
        </div>
      )}
    </>
  );
}