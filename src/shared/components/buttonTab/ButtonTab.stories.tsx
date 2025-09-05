import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonTab from './ButtonTab';
import ButtonTabGroup from './ButtonTabGroup';

const meta: Meta<typeof ButtonTab> = {
  title: 'Components/ButtonTab',
  component: ButtonTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: 'boolean',
      description: '초기 활성화 상태',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 시 실행 함수',
    },
  },
} satisfies Meta<typeof ButtonTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '탭 버튼',
    isActive: false,
  },
}

export const Active: Story = {
  args: {
    children: '활성화된 탭',
    isActive: true,
  },
}

export const TabGroup: Story = {
  render: () => (
    <ButtonTabGroup 
      tabs={['전체보기', '안 읽음', '예약 확정']}
      defaultActiveIndex={0}
    />
  ),
}
