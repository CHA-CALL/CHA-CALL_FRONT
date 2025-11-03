import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from '@components/tooltip/Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    text: '맞춤조건을 설정할 수 있어요',
    isTooltipVisible: true,
    positionOffsetX: 0,
    positionOffsetY: 2,
  },
  argTypes: {
    text: {
      control: 'text',
      description: '툴팁에 사용될 텍스트',
    },
    isTooltipVisible: {
      control: 'boolean',
      description: '툴팁이 보이는 여부',
    },
    handleCloseTooltip: {
      action: 'close-tooltip',
      description: '툴팁 닫기',
    },
    positionOffsetX: {
      control: 'number',
      description: '툴팁과 부모요소 간 x축 offset',
    },
    positionOffsetY: {
      control: 'number',
      description: '툴팁과 부모요소 간 y축 offset',
    },
    horizontalAlign: {
      control: 'select',
      options: ['left', 'right'],
      description: '툴팁의 수평 정렬 (좌/우)',
    },
    verticalAlign: {
      control: 'select',
      options: ['top', 'bottom'],
      description: '툴팁의 수직 위치 (부모 기준 상/하)',
    },
  },
  decorators: [
    Story => (
      <div className='relative h-[10rem] w-[20rem]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomRight: Story = {
  args: {
    horizontalAlign: 'right',
    verticalAlign: 'bottom',
  },
};

export const BottomLeft: Story = {
  args: {
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
  },
};

export const TopRight: Story = {
  args: {
    horizontalAlign: 'right',
    verticalAlign: 'top',
  },
};

export const TopLeft: Story = {
  args: {
    horizontalAlign: 'left',
    verticalAlign: 'top',
  },
};
