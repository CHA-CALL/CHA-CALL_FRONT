import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import ButtonCheck from '@shared/components/button-check/ButtonCheck';

const meta: Meta<typeof ButtonCheck> = {
  title: 'Components/ButtonCheck',
  component: ButtonCheck,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: { type: 'boolean' },
      description: '체크박스의 선택 여부 상태',
    },
    setIsChecked: {
      action: 'checked changed',
      description: '체크 상태를 변경하는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    isChecked: false,
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    return <ButtonCheck isChecked={isChecked} setIsChecked={setIsChecked} />;
  },
};