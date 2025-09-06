import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonTrash from './ButtonTrash';

const meta: Meta<typeof ButtonTrash> = {
  title: 'Components/ButtonTrash',
  component: ButtonTrash,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    handleClick: {
      action: 'clicked',
      description: '클릭 시 실행 함수',
    }
  }
};

export default meta;

type Story = StoryObj<typeof ButtonTrash>;

export const Default: Story = {
  args: {
    handleClick: () => alert('삭제 버튼 클릭'),
  }
};
