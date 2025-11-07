import React, { useRef, useState, type FormEvent } from 'react';
import useAutosizeTextarea from '@components/chat/chat-input-area/hooks/use-autosize-textarea';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';

interface ChatInputBarProps {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatInputBar({
  isOpenMenu,
  setIsOpenMenu,
}: ChatInputBarProps) {
  const [message, setMessage] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textAreaRef.current, message);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage('');
  };

  const handleExtensionClick = () => {
    textAreaRef.current?.blur();
    setIsOpenMenu(prev => !prev);
  };

  const textAreaBaseClasses =
    'bg-grayscale-100 body-m-14 w-full resize-none overflow-hidden rounded-[2rem] border-none px-[1.8rem] py-[0.8rem]';
  const textAreaInputclasses =
    'caret-grayscale-900 placeholder:text-grayscale-500 focus:outline-none max-h-[10rem]';

  return (
    <form
      onSubmit={handleSubmit}
      className='border-t-1 border-grayscale-100 flex w-full items-end bg-white px-[1.1rem] py-[0.8rem]'
    >
      <button
        type='button'
        className='bg-grayscale-900 mb-[0.7rem] mr-[0.5rem] flex h-[2.2rem] w-[2.2rem] flex-shrink-0 items-center justify-center rounded-full p-[0.5rem]'
        onClick={handleExtensionClick}
      >
        {isOpenMenu ? (
          <Icon
            name={'ic_close'}
            className='h-[2.2rem] w-[2.2rem] text-white'
          />
        ) : (
          <Icon name={'ic_plus'} className='h-[0.8rem] w-[0.8rem] text-white' />
        )}
      </button>
      <textarea
        ref={textAreaRef}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder='메세지를 입력하세요.'
        rows={1}
        className={cn(textAreaBaseClasses, textAreaInputclasses)}
      />
      <button
        type='submit'
        disabled={message === ''}
        className={cn(
          'flex h-[3.6rem] w-[3.6rem] items-center justify-center p-[0.8rem]',
          message !== '' ? 'text-primary-700' : 'text-grayscale-300'
        )}
      >
        <Icon name='ic_subtract' />
      </button>
    </form>
  );
}
