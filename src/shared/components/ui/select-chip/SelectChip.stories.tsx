import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectChip from '@ui/select-chip/SelectChip';

const meta: Meta<typeof SelectChip> = {
  title: 'Components/UI/SelectChip',
  component: SelectChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '칩에 표시될 텍스트',
    },
    handleDeleteChip: {
      action: 'deleted',
      description: '칩의 x 버튼 클릭 시 호출되는 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'React',
  },
};

export const LongTitle: Story = {
  args: {
    title: '타입스크립트와 리액트 쿼리',
  },
};
