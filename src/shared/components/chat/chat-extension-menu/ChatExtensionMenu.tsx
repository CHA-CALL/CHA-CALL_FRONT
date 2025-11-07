import { useRef, useState, type FormEvent } from 'react';
import ExtensionMenuItem from '@components/chat/chat-extension-menu/components/ExtensionMenuItem';
import { Icon } from '@components/icon/Icon';
import useAutosizeTextarea from '@components/chat/chat-extension-menu/hooks/use-autosize-textarea';
import { cn } from '@utils/cn';

export default function ChatExtensionMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [active, setActive] = useState(false);
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
    ' bg-grayscale-100 body-m-14 w-full resize-none overflow-hidden rounded-[5rem] border-none px-[1.8rem] py-[0.8rem] ';
  const textAreaInputclasses =
    'caret-grayscale-900 placeholder:text-grayscale-500 focus:outline-none';

  return (
    <div>
      <div className='flex items-center gap-[0.5rem] px-[1.1rem] py-[0.8rem]'>
        <button
          type='button'
          className='bg-grayscale-900 flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full p-[0.5rem]'
          onClick={handleExtensionClick}
        >
          <Icon name={'ic_plus'} className='h-[0.8rem] w-[0.8rem] text-white' />
        </button>
        <form onSubmit={handleSubmit} className='flex w-full'>
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
            className='flex h-[3.6rem] w-[3.6rem] items-center justify-center p-[0.8rem]'
          >
            <Icon name='ic_subtract' className='text-grayscale-300' />
          </button>
        </form>
      </div>
      {isOpenMenu && (
        <div className='flex flex-col items-center gap-[1.6rem] px-[4rem] py-[2rem]'>
          <nav className='flex gap-[2.4rem]'>
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
          </nav>

          <nav className='flex gap-[2.4rem]'>
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
          </nav>
        </div>
      )}
    </div>
  );
}
