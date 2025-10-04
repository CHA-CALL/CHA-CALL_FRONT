import { type ChangeEvent } from 'react';
import { MENU_LIMIT } from '@pages/@owner/menu/constant/menu';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-menu-form';
import { Icon } from '@components/icon/Icon';
import ErrorText from '@components/error-text/ErrorText';

interface MenuNameInputProps {
  value: MenuFormData['name'];
  error?: string;
  onChange: (_value: string) => void;
}

export default function MenuNameInput({
  value,
  error,
  onChange,
}: MenuNameInputProps) {
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClearName = () => {
    onChange('');
  };

  return (
    <>
      <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>메뉴 이름</span>
      <div className='
        flex w-full items-center justify-between
        mb-[2rem] py-[1.55rem] pl-[2rem] pr-[1rem]
        border border-grayscale-300 rounded-[1.6rem]
        focus-within:border-grayscale-500'
      >
        <input
          className='
            w-full rounded-[1.6rem]
            body-m-14 text-grayscale-900 caret-primary-700
            placeholder:body-m-14 placeholder:text-grayscale-300
          '
          placeholder='텍스트를 입력해주세요.'
          value={value}
          onChange={handleChangeName}
          maxLength={MENU_LIMIT.NAME_MAX_LENGTH}
        />
        <div className='caption-m-12 flex items-center justify-end gap-[0.1rem] mr-[0.5rem]'>
          <p className='text-primary-700'>{value.length}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{MENU_LIMIT.NAME_MAX_LENGTH}</p>
          <button type='button' onClick={handleClearName}>
            <Icon name='ic_close' width={16} height={16} className='pt-[0.3rem] pl-[0.3rem]' />
          </button>
        </div>
      </div>
      {error && (
        <div className='mt-[-1.8rem]'>
          <ErrorText text={error} />
        </div>
      )}
    </>
  );
}
