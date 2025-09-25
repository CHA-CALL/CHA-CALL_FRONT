import type { Meta, StoryObj } from '@storybook/react-vite';
import FoodTruckCard from '@components/food-truck-card/FoodTruckCard';
import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';

const meta: Meta<typeof FoodTruckCard> = {
  title: 'Components/FoodTruckCard',
  component: FoodTruckCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['reservationProvider', 'reservationClient', 'foodtruckProvider', 'foodtruckClient'] },
    image: { control: 'text' },
    foodTruckName: { control: 'text' },
    handleClickButton: { action: 'button clicked' },
    isLast: { control: 'boolean' },
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
  },
};

export default meta;
type Story = StoryObj<FoodTruckCardProps>;

export const ReservationProvider: Story = {
  args: {
    variant: 'reservationProvider',
    image: 'https://placehold.co/50',
    clientName: '고정현',
    foodTruckName: '오소리 푸드트럭',
    location: '서울 광진구 화양동',
    period: '2025.09.30 - 2025.10.05',
    time: '13:00 - 19:00',
    handleClickButton() {
      alert('버튼 클릭');
    },
    isLast: false,
  },
};

export const ReservationClient: Story = {
  args: {
    variant: 'reservationClient',
    image: 'https://placehold.co/50',
    foodTruckName: '오소리 푸드트럭',
    location: '서울 광진구 화양동',
    period: '2025.09.30 - 2025.10.05',
    time: '13:00 - 19:00',
    handleClickButton() {
      alert('버튼 클릭');
    },
    isLast: false,
  },
};

export const FoodTruckProvider: Story = {
  args: {
    variant: 'foodtruckProvider',
    image: 'https://placehold.co/50',
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
    isLast: false,
  },
};

export const FoodTruckClient: Story = {
  args: {
    variant: 'foodtruckClient',
    isLiked: false,
    image: 'https://placehold.co/50',
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
    isLast: false,
  },
};
