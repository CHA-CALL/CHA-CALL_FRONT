import { useState } from 'react';
import ExtensionMenuItem from './components/ExtensionMenuItem';
import { Icon } from '@shared/components/icon/Icon';

export default function ChatExtensionMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <div>
      <div className='flex gap-[0.5rem] px-[1.1rem] py-[0.8rem]'>
        <button className='bg-grayscale-900 flex items-center justify-center rounded-full p-[0.9rem]'>
          <Icon name={'ic_plus'} className='h-[0.8rem] w-[0.8rem] text-white' />
        </button>
        <form className='flex w-full'>
          <input
            type='text'
            placeholder='메세지를 입력하세요.'
            className='bg-grayscale-100 w-full rounded-[5rem] px-[1.8rem] py-[0.8rem]'
          />
          <button
            type='submit'
            className='flex h-[3.6rem] w-[3.6rem] items-center justify-center p-[0.8rem]'
          >
            <Icon name='ic_subtract' className='text-grayscale-300' />
          </button>
        </form>
      </div>
      <div className='border-1 flex flex-col items-center gap-[1.6rem] px-[4rem] py-[2rem]'>
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
    </div>
  );
}
