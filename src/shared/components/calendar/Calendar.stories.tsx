import type { Meta, StoryObj } from '@storybook/react-vite';
import Calendar from '@components/calendar/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '월 단위로 날짜를 선택하는 캘린더 컴포넌트입니다. 최대 2개의 날짜를 선택해 범위를 구성할 수 있으며, "적용" 시 `handleApplyDate`로 결과를 전달합니다. 아이콘 스프라이트(`ic_back`, `ic_next`)가 전역 주입되어 있어야 합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        '열림 상태 플래그. 값이 바뀌면 내부 선택 상태가 초기화됩니다(스토리에서 리셋 트리거용으로 사용).',
    },
    handleApplyDate: {
      action: 'apply-date',
      description:
        '`적용` 버튼 클릭 시 호출됩니다. `{ startDate: Date|null, endDate: Date|null }`를 전달합니다.',
    },
    handleCloseBottomSheet: {
      action: 'close',
      description: '`취소` 클릭 시 호출됩니다.',
    },
  },
  decorators: [
    Story => (
      // w-full 기준 폭을 잡아주면 디자인이 안정적으로 보입니다.
      <div style={{ width: 960, maxWidth: '60rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    selectedDate: { startDate: null, endDate: null },
    isOpen: true,
    handleApplyDate: () => {},
    handleCloseBottomSheet: () => {},
  },
};
