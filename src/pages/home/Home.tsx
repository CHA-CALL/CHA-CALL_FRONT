import { ButtonCheck } from '@shared/components/btn-check/ButtonCheck';
import { Icon } from '@shared/components/icon/Icon';
import { useState } from 'react';

const Home = () => {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div>
      <div className='flex'>
        <ButtonCheck isChecked={isChecked} setIsChecked={setIsChecked} />
        <ButtonCheck isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      <Icon name='ic_search' />
      <Icon name='ic_search' width={40} height={40} />
      <Icon name='ic_confirm' width={40} height={40} color='#F83419' />
      <p className='heading-sb-20'>Hello World</p>
      <p className='heading-sb-18'>Hello World</p>
      <p className='title-b-16'>Hello World</p>
      <p className='title-b-14'>Hello World</p>
      <p className='title-sb-16'>Hello World</p>
      <p className='title-sb-14'>Hello World</p>
      <p className='title-sb-12'>Hello World</p>
      <p className='body-m-16'>Hello World</p>
      <p className='body-m-14'>Hello World</p>
      <p className='caption-m-12'>Hello World</p>
      <p className='caption-r-12'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='heading-sb-20'>Hello World</p>
      <p className='heading-sb-18'>Hello World</p>
      <p className='title-b-16'>Hello World</p>
      <p className='title-b-14'>Hello World</p>
      <p className='title-sb-16'>Hello World</p>
      <p className='title-sb-14'>Hello World</p>
      <p className='title-sb-12'>Hello World</p>
      <p className='body-m-16'>Hello World</p>
      <p className='body-m-14'>Hello World</p>
      <p className='caption-m-12'>Hello World</p>
      <p className='caption-r-12'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='scrollbar-hide'>Hello World</p>
      <p className='bg-primary-25'>Hello World</p>
      <p className='bg-primary-50'>Hello World</p>
      <p className='bg-primary-100'>Hello World</p>
      <p className='bg-primary-300'>Hello World</p>
      <p className='bg-primary-500'>Hello World</p>
      <p className='bg-primary-700'>Hello World</p>
      <p className='bg-primary-900'>Hello World</p>
      <p className='bg-grayscale-50'>Hello World</p>
      <p className='bg-grayscale-100'>Hello World</p>
      <p className='bg-grayscale-200'>Hello World</p>
      <p className='bg-grayscale-300'>Hello World</p>
      <p className='bg-grayscale-500'>Hello World</p>
      <p className='bg-grayscale-700'>Hello World</p>
      <p className='bg-grayscale-900'>Hello World</p>
      <p className='bg-white'>Hello World</p>
      <p className='bg-black50'>Hello World</p>
      <p className='bg-black'>Hello World</p>
    </div>
  );
};

export default Home;
