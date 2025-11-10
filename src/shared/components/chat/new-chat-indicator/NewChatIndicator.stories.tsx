import type { Meta, StoryObj } from '@storybook/react-vite';
import NewChatIndicator from '@components/chat/new-chat-indicator/NewChatIndicator';

const meta: Meta<typeof NewChatIndicator> = {
  title: 'Components/Chat/NewChatIndicator',
  component: NewChatIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    profileImage: { control: 'text' },
    name: { control: 'text' },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileImage: 'https://placehold.co/26',
    name: '이현준',
    message: '메시지 확인해주세요!',
  },
};

export const LongMessage: Story = {
  args: {
    profileImage: 'https://placehold.co/26',
    name: '이현준',
    message: '말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인',
  },
};
