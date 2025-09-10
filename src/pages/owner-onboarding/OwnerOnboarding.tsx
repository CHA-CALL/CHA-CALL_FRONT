import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Title from './components/title/Title';
import SearchBar from '@shared/components/search-bar/SearchBar';
import { useState } from 'react';
import Button from '@shared/components/button/Button';

export default function OwnerOnboarding() {
  const [name, setName] = useState('');
  const [businessLicense, setBusinessLicense] = useState('');
  const [etc, setEtc] = useState('');

  return (
    <>
      <Navigation text='Owner Onboarding' leftIcon={<Icon name='ic_back' />} />
      <div className='flex w-full flex-col items-center justify-center gap-[2.6rem] p-[2rem] gap-[2.6rem]'>
        <section className='flex w-full flex-col items-start justify-center gap-[1rem]'>
          <Title title='이름' />
          <SearchBar value={name} onChange={(e) => setName(e.target.value)}  maxLength={10} rightComponent={<Button variant='verify' buttonStyle='active' handleClickButton={() => {}}>즁복확인</Button>}/>
        </section>
        <div className='w-full h-[0.1rem] bg-grayscale-100'/>
        <section className='flex w-full flex-col items-start justify-center gap-[1.2rem]'>
          <Title title='사업자 등록증' maxLength={1} currentLength={businessLicense.length}/>
        </section>
        <div className='w-full h-[0.1rem] bg-grayscale-100'/>
        <section className='flex w-full flex-col items-start justify-center gap-[1.2rem]'> 
          <Title title='기타 서류' maxLength={5} currentLength={etc.length}/>
        </section>
      </div>
    </>
  );
}
