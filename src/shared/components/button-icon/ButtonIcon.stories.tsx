import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonIcon from '@shared/components/button-icon/ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    handleClick: {
      action: 'clicked',
      description: '클릭 시 실행 함수',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    icon: 'ic_trash',
    handleClick: () => alert('삭제 버튼 클릭'),
  },
};
