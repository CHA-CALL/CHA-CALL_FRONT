import type { Meta, StoryObj } from '@storybook/react-vite';
import LeaveChatBottomSheet from '@components/chat/leave-chat-bottom-sheet/LeaveChatBottomSheet';

const meta: Meta<typeof LeaveChatBottomSheet> = {
  title: 'Components/Chat/LeaveChatBottomSheet',
  component: LeaveChatBottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    handleLeaveChat: { action: 'handleLeaveChat' },
    handleCloseBottomSheet: { action: 'handleCloseBottomSheet' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='h-[50vh]'>
      <LeaveChatBottomSheet
        isOpen={true}
        handleLeaveChat={() => {}}
        handleCloseBottomSheet={() => {}}
      />
    </div>
  ),
};
