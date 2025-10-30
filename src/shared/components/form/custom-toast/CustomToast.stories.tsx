import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomToast } from '@form/custom-toast/CustomToast';

const meta: Meta<typeof CustomToast> = {
  title: 'Components/Form/CustomToast',
  component: CustomToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error'],
      description: '토스트 타입',
    },
    message: {
      control: { type: 'text' },
      description: '토스트에 표시될 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: '성공적으로 저장되었습니다.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: '저장에 실패했습니다.',
  },
};
