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
    description: { control: 'text' },
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
    handleClickButton: () => {},
    isLast: false,
  },
};

