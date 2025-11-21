import React, { useRef, useState, type FormEvent } from 'react';
import { cn } from '@utils/cn';
import { Icon } from '@icon/Icon';
import useAutosizeTextarea from '@pages/chat-room/chat-input-area/hooks/use-autosize-textarea';

interface ChatInputBarProps {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendMessage: (_message: string) => void;
}

export default function ChatInputBar({
  isOpenMenu,
  setIsOpenMenu,
  handleSendMessage,
}: ChatInputBarProps) {
  const [message, setMessage] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textAreaRef.current, message);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    handleSendMessage(message);
    setMessage('');
  };

  const handleExtensionClick = () => {
    textAreaRef.current?.blur();
    setIsOpenMenu(prev => !prev);
  };

  const handleCloseExtension = () => {
    setIsOpenMenu(false);
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
        <Icon
          name='ic_plus'
          className={cn(
            'h-[2.2rem] w-[2.2rem] text-white transition-transform duration-300 ease-in-out',
            isOpenMenu ? 'rotate-45' : 'rotate-0'
          )}
        />
      </button>
      <textarea
        ref={textAreaRef}
        value={message}
        onFocus={handleCloseExtension}
        onChange={e => setMessage(e.target.value)}
        placeholder='메세지를 입력하세요.'
        rows={1}
        className={cn(textAreaBaseClasses, textAreaInputclasses)}
      />
      <button
        type='submit'
        disabled={message.trim() === ''}
        className={cn(
          'flex h-[3.6rem] w-[3.6rem] items-center justify-center p-[0.8rem]',
          message.trim() !== '' ? 'text-primary-700' : 'text-grayscale-300'
        )}
      >
        <Icon name='ic_subtract' />
      </button>
    </form>
  );
}
