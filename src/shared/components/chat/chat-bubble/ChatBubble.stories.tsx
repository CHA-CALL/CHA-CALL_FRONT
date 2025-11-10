import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatBubble from '@components/chat/chat-bubble/ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/Chat/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    time: { control: 'text' },
    isMine: { control: 'boolean' },
    isRead: { control: 'boolean' },
    profileImage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MyBubble: Story = {
  args: {
    message: '말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인',
    time: '오후 3:45',
    isMine: true,
    isRead: false,
  },
};

export const OtherBubble: Story = {
  args: {
    message: '말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인 말풍선 맥시멈 확인',
    time: '오후 3:46',
    isMine: false,
    profileImage: 'https://placehold.co/30',
  },
};

export const Conversation: Story = {
  render: () => (
    <div className='flex flex-col gap-[1rem] p-[2rem] bg-white'>
      <ChatBubble
        message='안녕하세요'
        time='오후 5:21'
        isMine={false}
        profileImage='https://placehold.co/30'
      />
      <ChatBubble
        message='혹시 거래 가능할까요?'
        time='오후 5:21'
        isMine={false}
      />
      <ChatBubble
        message='넵, 가능합니다!'
        time='오후 9:00'
        isRead={true}
      />
      <ChatBubble
        time='오후 9:00'
        isRead={true}
        handleReservationClick={() => {}}
      />
      <ChatBubble
        time='오후 10:00'
        isMine={false}
        profileImage='https://placehold.co/30'
        handleReservationClick={() => {}}
      />
      <ChatBubble
        message='감사합니다!'
        time='오후 10:05'
        isMine={true}
      />
    </div>
  ),
};
