import type { ChangeEvent } from 'react';
import { MENU_LIMIT } from '@pages/@owner/menu/constant/menu';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-menu-form';
import ErrorText from '@components/error-text/ErrorText';

interface MenuDescInputProps {
  value: MenuFormData['description'];
  error?: string;
  onChange: (_value: string) => void;
}

export default function MenuDescInput({
  value,
  error,
  onChange,
}: MenuDescInputProps) {
  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>메뉴 설명</span>
      <textarea
        className='
          h-[12.2rem] px-[2rem] py-[1.65rem] rounded-[1.6rem]
          body-m-14 text-grayscale-900 border-grayscale-300 caret-primary-700
          placeholder:body-m-14 placeholder:text-grayscale-300
          focus:border-grayscale-500 focus:outline-none
        '
        placeholder='텍스트를 입력해주세요.'
        value={value}
        onChange={handleChangeDescription}
        maxLength={MENU_LIMIT.DESCRIPTION_MAX_LENGTH}
      />
      <div className='caption-m-12 flex items-center justify-end gap-[0.1rem] mt-[0.6rem] mr-[0.5rem]'>
        {error && (
          <div className='mr-auto'>
            <ErrorText text={error} />
          </div>
        )}
        <p className='text-primary-700'>{value.length}</p>
        <p className='text-grayscale-700'>/</p>
        <p className='text-grayscale-700'>{MENU_LIMIT.DESCRIPTION_MAX_LENGTH}</p>
      </div>
    </>
  );
}
