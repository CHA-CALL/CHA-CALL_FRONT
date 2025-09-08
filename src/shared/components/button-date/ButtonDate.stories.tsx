import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonDate from '@shared/components/button-date/ButtonDate';

const meta: Meta<typeof ButtonDate> = {
  title: 'Components/ButtonDate',
  component: ButtonDate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    startDate: {
      control: { type: 'date' },
      description: '시작 날짜 (없으면 플레이스홀더 표시)',
    },
    endDate: {
      control: { type: 'date' },
      description: '종료 날짜 (선택 시, 시작~종료 범위 표시)',
    },
    handleOpenCalendar: {
      action: 'open-calendar',
      description: '달력 열기 핸들러(바텀시트/모달 등)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    startDate: null,
    endDate: null,
  },
  render: args => (
    <ButtonDate
      {...args}
      startDate={
        typeof args.startDate === 'number'
          ? new Date(args.startDate)
          : args.startDate
      }
      endDate={
        typeof args.endDate === 'number' ? new Date(args.endDate) : args.endDate
      }
    />
  ),
};

export const StartOnly: Story = {
  args: {
    startDate: new Date(2025, 8, 10),
    endDate: null,
  },
  render: args => (
    <ButtonDate
      {...args}
      startDate={
        typeof args.startDate === 'number'
          ? new Date(args.startDate)
          : args.startDate
      }
      endDate={
        typeof args.endDate === 'number' ? new Date(args.endDate) : args.endDate
      }
    />
  ),
};

export const RangeSelected: Story = {
  args: {
    startDate: new Date(2025, 8, 10),
    endDate: new Date(2025, 8, 20),
  },
  render: args => (
    <ButtonDate
      {...args}
      startDate={
        typeof args.startDate === 'number'
          ? new Date(args.startDate)
          : args.startDate
      }
      endDate={
        typeof args.endDate === 'number' ? new Date(args.endDate) : args.endDate
      }
    />
  ),
};
