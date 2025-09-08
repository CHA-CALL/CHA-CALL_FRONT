import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonText from './ButtonText';

const meta: Meta<typeof ButtonText> = {
  title: 'Components/ButtonText',
  component: ButtonText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 텍스트'
    },
    handleClick: {
      action: 'clicked',
      description: '클릭 시 실행 함수'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '일정 추가하기',
    handleClick: () => alert('버튼 클릭'),
  },
};
