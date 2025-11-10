import type { Meta, StoryObj } from '@storybook/react-vite';
import ChatTemplatesBottomSheet from '@components/chat/chat-templates-bottom-sheet/ChatTemplatesBottomSheet';

const meta: Meta<typeof ChatTemplatesBottomSheet> = {
  title: 'Components/Chat/ChatTemplatesBottomSheet',
  component: ChatTemplatesBottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    handleAddTemplate: { action: 'handleAddTemplate' },
    handleCloseBottomSheet: { action: 'handleCloseBottomSheet' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const messageTemplates = [
  '안녕하세요!',
  '안녕하세요?',
  'Hello',
  '반갑습니다',
  'test 1',
  'test 2',
  'test 3',
  'test 4',
  'test 5',
  'test 6',
  'test 7',
  'test 8',
];

export const Default: Story = {
  render: () => (
    <div className='h-[50vh]'>
      <ChatTemplatesBottomSheet
        isOpen={true}
        templates={messageTemplates}
        handleAddTemplate={() => {}}
        handleCloseBottomSheet={() => {}}
      />
    </div>
  ),
};
