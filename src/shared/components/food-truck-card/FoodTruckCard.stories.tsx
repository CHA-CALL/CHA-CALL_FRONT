import type { Meta, StoryObj } from '@storybook/react-vite';
import FoodTruckCard, {
  type FoodTruckCardProps,
} from '@components/food-truck-card/FoodTruckCard';
import { FOOD_TRUCK_CARD_VARIANTS } from '@constant/food-truck-card-variants';

const meta: Meta<typeof FoodTruckCard> = {
  title: 'Components/FoodTruckCard',
  component: FoodTruckCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER,
        FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT,
        FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER,
        FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT,
      ],
    },
    data: { control: 'object' },
    isOn: { control: 'boolean' },
    isRemovable: { control: 'boolean' },
    isRemove: { control: 'boolean' },
    handleClickButton: { action: 'button clicked' },
    handleClickCard: { action: 'card clicked' },
    handleCardRemove: { action: 'card removed' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FoodTruckCardProps>;

export const ReservationProvider: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER,
    data: {
      profileImage: 'https://placehold.co/50',
      name: '고정현',
      foodTruckName: '오소리 푸드트럭',
      address: '서울 광진구 화양동',
      dateTimeInfos: ['2025-09-20 13시~19시', '2025-09-21 13시~19시'],
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const ReservationClient: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT,
    data: {
      photoUrl: 'https://placehold.co/80',
      name: '오소리 푸드트럭',
      address: '서울 광진구 화양동',
      dateTimeInfos: ['2025-09-20 13시~19시', '2025-09-21 13시~19시'],
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const FoodTruckProvider: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER,
    data: {
      imageUrl: 'https://placehold.co/74',
      name: '오소리 푸드트럭',
      description: '바삭한 타코로 즐거운 한입을!',
      activeTime: '09:00 - 21:00',
      serviceArea: '서울 특별시 전체, 인천광역시 계양구, 수원시 기안동',
    },
    isRemovable: true,
    isRemove: false,
    isOn: true,
    handleCardRemove() {
      alert('카드 제거');
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const FoodTruckProviderOff: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER,
    data: {
      imageUrl: 'https://placehold.co/74',
      name: '오소리 푸드트럭',
      description: '바삭한 타코로 즐거운 한입을!',
      activeTime: '09:00 - 21:00',
      serviceArea: '서울 특별시 전체, 인천광역시 계양구, 수원시 기안동',
    },
    isRemovable: true,
    isRemove: false,
    isOn: false,
    handleCardRemove() {
      alert('카드 제거');
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const FoodTruckClient: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT,
    data: {
      photoUrl: 'https://placehold.co/80',
      name: '오소리 푸드트럭',
      averageRating: 4.5,
      ratingCount: 10,
      description: '바삭한 타코로 즐거운 한입을!',
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'px-[2rem] py-[2.2rem]',
  },
};

export const ReservationProviderList: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER,
    data: {
      profileImage: 'https://placehold.co/50',
      name: '고정현',
      foodTruckName: '오소리 푸드트럭',
      address: '서울 광진구 화양동',
      dateTimeInfos: ['2025-09-20 13시~19시', '2025-09-21 13시~19시'],
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col gap-[2rem] bg-white p-[2rem]'>
      <FoodTruckCard {...args} />
      <div className='bg-grayscale-100 h-[0.1rem] w-full' />
      <FoodTruckCard {...args} />
      <div className='bg-grayscale-100 h-[0.1rem] w-full' />
      <FoodTruckCard {...args} />
    </div>
  ),
};

export const ReservationClientList: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT,
    data: {
      photoUrl: 'https://placehold.co/80',
      name: '오소리 푸드트럭',
      address: '서울 광진구 화양동',
      dateTimeInfos: ['2025-09-20 13시~19시', '2025-09-21 13시~19시'],
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col gap-[2rem] bg-white p-[2rem]'>
      <FoodTruckCard {...args} />
      <div className='bg-grayscale-100 h-[0.1rem] w-full' />
      <FoodTruckCard {...args} />
      <div className='bg-grayscale-100 h-[0.1rem] w-full' />
      <FoodTruckCard {...args} />
    </div>
  ),
};

export const FoodTruckProviderList: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER,
    data: {
      imageUrl: 'https://placehold.co/74',
      name: '오소리 푸드트럭',
      description: '바삭한 타코로 즐거운 한입을!',
      activeTime: '09:00 - 21:00',
      serviceArea: '서울 특별시 전체, 인천광역시 계양구, 수원시 기안동',
    },
    isRemovable: true,
    isRemove: false,
    isOn: true,
    handleCardRemove() {
      alert('카드 제거');
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col gap-[2rem] bg-white p-[2rem]'>
      <FoodTruckCard {...args} />
      <div className='bg-grayscale-100 h-[0.1rem] w-full' />
      <FoodTruckCard {...args} />
      <div className='bg-grayscale-100 h-[0.1rem] w-full' />
      <FoodTruckCard {...args} />
    </div>
  ),
};

export const FoodTruckClientList: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT,
    data: {
      photoUrl: 'https://placehold.co/80',
      name: '오소리 푸드트럭',
      averageRating: 4.5,
      ratingCount: 10,
      description: '바삭한 타코로 즐거운 한입을!',
    },
    handleClickButton() {
      alert('버튼 클릭');
    },
    handleClickCard() {
      alert('카드 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col bg-white p-[2rem]'>
      <span className='text-grayscale-500 caption-m-12 mb-[1rem] ml-[0.4rem]'>
        총 14개
      </span>
      <div className='flex flex-col gap-[2rem]'>
        <FoodTruckCard {...args} />
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <FoodTruckCard {...args} />
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <FoodTruckCard {...args} />
      </div>
    </div>
  ),
};
