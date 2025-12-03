import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { cn } from '@utils/cn';
import { Icon } from '@icon/Icon';
import useAutosizeTextarea from '@pages/chat-room/chat-input-area/hooks/use-autosize-textarea';

interface ChatInputBarProps {
  isOpenMenu: boolean;
  selectedQuickMessage?: string;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendMessage: (_message: string) => void;
}

export default function ChatInputBar({
  isOpenMenu,
  selectedQuickMessage,
  setIsOpenMenu,
  handleSendMessage,
}: ChatInputBarProps) {
  const [message, setMessage] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextarea(textAreaRef.current, message);

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!message.trim()) return;
    handleSendMessage(message);
    setMessage('');
  };

  const handleKeyDownSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      if (message.trim() !== '') {
        handleSubmit();
      }
    }
  };
  const handleExtensionClick = () => {
    textAreaRef.current?.blur();
    setIsOpenMenu(prev => !prev);
  };

  const handleCloseExtension = () => {
    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (selectedQuickMessage) {
      setMessage(selectedQuickMessage);
    }
  }, [selectedQuickMessage]);

  const textAreaBaseClasses =
    'bg-grayscale-100 body-m-14 w-full min-h-[4rem] resize-none overflow-hidden rounded-[2rem] border-none px-[1.8rem] py-[0.9rem]';
  const textAreaInputclasses =
    'caret-grayscale-900 placeholder:text-grayscale-500 focus:outline-none max-h-[10rem]';

  return (
    <form
      onSubmit={handleSubmit}
      className='border-t-1 flex w-full items-end border-grayscale-100 bg-white px-[1.1rem] py-[0.8rem]'
    >
      <div className='mr-[0.5rem] p-[0.9rem]'>
        <button
          type='button'
          className='flex h-[2.2rem] w-[2.2rem] flex-shrink-0 items-center justify-center rounded-full bg-grayscale-900 px-[0.6rem] py-[0.5rem]'
          onClick={handleExtensionClick}
        >
          <Icon
            name='ic_plus'
            className={cn(
              'text-white transition-transform duration-300 ease-in-out',
              isOpenMenu ? 'rotate-45' : 'rotate-0'
            )}
          />
        </button>
      </div>

      <textarea
        ref={textAreaRef}
        value={message}
        onFocus={handleCloseExtension}
        onChange={handleChangeMessage}
        onKeyDown={handleKeyDownSubmit}
        placeholder='메세지를 입력하세요.'
        rows={1}
        className={cn(textAreaBaseClasses, textAreaInputclasses)}
      />
      <button
        type='submit'
        disabled={message.trim() === ''}
        className={cn(
          'flex items-center justify-center px-[0.8rem] py-[0.9rem]',
          message.trim() !== '' ? 'text-primary-700' : 'text-grayscale-300'
        )}
      >
        <Icon name='ic_subtract' />
      </button>
    </form>
  );
}
