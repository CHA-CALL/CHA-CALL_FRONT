import type { Meta, StoryObj } from '@storybook/react-vite';
import FoodTruckCard from '@components/food-truck-card/FoodTruckCard';
import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';
import { FOOD_TRUCK_CARD_VARIANTS } from '@shared/constant/food-truck-card-variants';

const meta: Meta<typeof FoodTruckCard> = {
  title: 'Components/FoodTruckCard',
  component: FoodTruckCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER,
        FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT,
        FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER,
        FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT,
      ]
    },
    image: { control: 'text' },
    foodTruckName: { control: 'text' },
    handleClickButton: { action: 'button clicked' },
    // Reservation
    clientName: { control: 'text' },
    location: { control: 'text' },
    period: { control: 'text' },
    time: { control: 'text' },
    // FoodTruck
    isLiked: { control: 'boolean' },
    description: { control: 'text' },
    locations: { control: 'text' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    tags: { control: 'object' },
    handleClickCard: { action: 'card clicked' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FoodTruckCardProps>;

export const ReservationProvider: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER,
    image: 'https://placehold.co/50',
    clientName: '고정현',
    foodTruckName: '오소리 푸드트럭',
    location: '서울 광진구 화양동',
    period: '2025.09.30 - 2025.10.05',
    time: '13:00 - 19:00',
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const ReservationClient: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT,
    image: 'https://placehold.co/80',
    foodTruckName: '오소리 푸드트럭',
    location: '서울 광진구 화양동',
    period: '2025.09.30 - 2025.10.05',
    time: '13:00 - 19:00',
    handleClickButton() {
      alert('버튼 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const FoodTruckProvider: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER,
    image: 'https://placehold.co/74',
    foodTruckName: '오소리 푸드트럭',
    description: '바삭한 타코로 즐거운 한입을!',
    time: '09:00 - 21:00',
    locations: '서울 특별시 전체, 인천광역시 계양구, 수원시 기안동',
    handleClickButton() {
      alert('버튼 클릭');
    },
    handleClickCard() {
      alert('카드 클릭');
    },
    className: 'p-[2rem]',
  },
};

export const FoodTruckClient: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT,
    isLiked: true,
    image: 'https://placehold.co/80',
    foodTruckName: '오소리 푸드트럭',
    rating: 4.5,
    reviewCount: 10,
    description: '바삭한 타코로 즐거운 한입을!',
    tags: ['피자', '양식'],
    handleClickButton() {
      alert('버튼 클릭');
    },
    handleClickCard() {
      alert('카드 클릭');
    },
    className: 'px-[2rem] py-[2.2rem]',
  },
};

export const ReservationProviderList: Story = {
  args: {
    variant: FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER,
    image: 'https://placehold.co/50',
    clientName: '고정현',
    foodTruckName: '오소리 푸드트럭',
    location: '서울 광진구 화양동',
    period: '2025.09.30 - 2025.10.05',
    time: '13:00 - 19:00',
    handleClickButton() {
      alert('버튼 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col gap-[2rem] p-[2rem] bg-white'>
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
    image: 'https://placehold.co/80',
    foodTruckName: '오소리 푸드트럭',
    location: '서울 광진구 화양동',
    period: '2025.09.30 - 2025.10.05',
    time: '13:00 - 19:00',
    handleClickButton() {
      alert('버튼 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col gap-[2rem] p-[2rem] bg-white'>
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
    image: 'https://placehold.co/74',
    foodTruckName: '오소리 푸드트럭',
    description: '바삭한 타코로 즐거운 한입을!',
    time: '09:00 - 21:00',
    locations: '서울 특별시 전체, 인천광역시 계양구, 수원시 기안동',
    handleClickButton() {
      alert('버튼 클릭');
    },
    handleClickCard() {
      alert('카드 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col gap-[2rem] p-[2rem] bg-white'>
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
    isLiked: true,
    image: 'https://placehold.co/80',
    foodTruckName: '오소리 푸드트럭',
    rating: 4.5,
    reviewCount: 10,
    description: '바삭한 타코로 즐거운 한입을!',
    tags: ['피자', '양식'],
    handleClickButton() {
      alert('버튼 클릭');
    },
    handleClickCard() {
      alert('카드 클릭');
    },
  },
  render: (args: FoodTruckCardProps) => (
    <div className='flex flex-col p-[2rem] bg-white'>
      <span className='caption-m-12 text-grayscale-500 ml-[0.4rem] mb-[1rem]'>
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
