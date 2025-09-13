import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import FoodTruckItem from '@pages/reservation/components/FoodTruckItem';

interface ReservationProps {
  location?: string;
}

export default function Reservation({
  location = '서울시 광진구 구의동',
}: ReservationProps) {
  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={() => alert('뒤로가기 클릭')}
        text='예약하기'
      />

      <div className={cn(
        'sticky top-[4.8rem] bg-white',
        'flex between items-center justify-between',
        'px-[2rem] pt-[1.2rem] pb-[1rem]',
        'border-b border-b-grayscale-100',
      )}>
        <button
          type='button'
          onClick={() => alert('위치설정')}
          className='flex items-center gap-[0.6rem] cursor-pointer'
        >
          <Icon name='ic_locate' color='#f83419' />
          <span className='body-m-14 text-grayscale-900'>{location}</span>
          <Icon name='ic_dash' />
        </button>
        <button
          type='button'
          onClick={() => alert('필터')}
          className={cn(
            'flex items-center justify-center',
            'w-[2.8rem] h-[2.8rem] rounded-[0.4rem] border border-grayscale-200'
          )}
        >
          <Icon name='ic_dash' />
        </button>
      </div>

      <div className='sticky top-[9.9rem] bg-white flex gap-[0.6rem] pl-[2rem] py-[1.2rem]'>
        <Button
          variant='chip'
          buttonStyle='default'
          handleClickButton={() => {}}
        >
          전체 보기
        </Button>
        <Button
          variant='chip'
          buttonStyle='selected1'
          handleClickButton={() => {}}
        >
          전체 보기
        </Button>
      </div>

      <div className='flex flex-col gap-[2.2rem] px-[2rem] py-[1.6rem]'>
        <FoodTruckItem
          image='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          name='달마시안 푸드트럭'
          priceRange='16,000-20,000'
          minOrder='30인분'
          tags={['피자', '양식']}
        />
        <FoodTruckItem
          image='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          name='달마시안 푸드트럭'
          priceRange='16,000-20,000'
          minOrder='30인분'
          tags={['피자', '양식']}
        />
        <FoodTruckItem
          image='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          name='달마시안 푸드트럭'
          priceRange='16,000-20,000'
          minOrder='30인분'
          tags={['피자', '양식']}
        />
        <FoodTruckItem
          image='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          name='달마시안 푸드트럭'
          priceRange='16,000-20,000'
          minOrder='30인분'
          tags={['피자', '양식']}
        />
        <FoodTruckItem
          image='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          name='달마시안 푸드트럭'
          priceRange='16,000-20,000'
          minOrder='30인분'
          tags={['피자', '양식']}
        />
        <FoodTruckItem
          image='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          name='달마시안 푸드트럭'
          priceRange='16,000-20,000'
          minOrder='30인분'
          tags={['피자', '양식']}
        />
      </div>

      <button
        type='button'
        onClick={() => {}}
        className={cn(
          'fixed bottom-[2.4rem] right-[2.4rem] w-[5rem] h-[5rem]',
          'flex items-center justify-center rounded-full',
          'bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.08)]'
        )}
      >
        <Icon name='ic_dash' />
      </button>
    </>
  )
}
