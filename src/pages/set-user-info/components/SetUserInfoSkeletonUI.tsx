import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';

export default function SetUserInfoSkeletonUI() {
  return (
    <div className='flex h-dvh flex-col'>
      <Navigation leftIcon={<Icon name='ic_back' />} />
      <div className='jusify-between flex flex-1 flex-col px-[2rem] pb-[1.7rem]'>
        <div className='flex flex-1 flex-col gap-[1rem] py-[2.2rem]'>
          <nav className='bg-grayscale-100 ml-[0.5rem] flex h-[2rem] w-[14rem] animate-pulse flex-col gap-[0.2rem] rounded-[1.6rem]'></nav>
          <nav className='bg-grayscale-100 ml-[0.5rem] flex h-[1rem] w-[15rem] animate-pulse flex-col gap-[0.2rem] rounded-[1.6rem]'></nav>
          <nav className='bg-grayscale-100 flex h-[5rem] w-full animate-pulse flex-col gap-[0.2rem] rounded-[1.6rem] px-[0.5rem]'></nav>
        </div>
        <Button variant='cta' buttonStyle='disabled' className='h-[5.4rem]'>
          저장하기
        </Button>
      </div>
    </div>
  );
}
