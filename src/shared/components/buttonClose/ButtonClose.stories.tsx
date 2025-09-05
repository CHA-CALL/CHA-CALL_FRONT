import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonClose from './ButtonClose';

const meta: Meta<typeof ButtonClose> = {
  title: 'Components/ButtonClose',
  component: ButtonClose,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: '클릭 시 실행 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert('닫기 버튼 클릭'),
  },
};
