import ButtonCheck from '@shared/components/ui/button-check/ButtonCheck';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof ButtonCheck> = {
  title: 'Components/Button/ButtonCheck',
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
    handleToggle: {
      action: 'checked changed',
      description:
        '체크 상태를 변경하는 함수. 이 함수가 제공되지 않으면, 부모 컴포넌트에서 상호작용을 대신합니다.',
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
    return (
      <ButtonCheck
        isChecked={isChecked}
        handleToggle={() => setIsChecked(!isChecked)}
      />
    );
  },
};
