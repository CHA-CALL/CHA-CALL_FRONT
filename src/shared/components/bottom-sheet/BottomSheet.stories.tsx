import type { Meta, StoryObj } from '@storybook/react-vite';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '바텀시트 열림/닫힘 상태',
    },
    sheetHeight: {
      control: { type: 'range', min: 240, max: 800, step: 20 },
      description: '시트 높이(px). 드래그 훅에서 사용',
    },
    handleCloseBottomSheet: {
      action: 'close',
      description: '배경 클릭/드래그 종료 시 호출되는 닫기 핸들러',
    },
    children: {
      control: 'text',
      description: '바텀시트 내부에 렌더될 콘텐츠(ReactNode)',
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          position: 'relative',
          height: '100dvh',
          background: '#f7f7f8',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    isOpen: true,
    sheetHeight: 400,
    children: (
      <div>
        <h3 className='heading-sb-20'>샘플 콘텐츠</h3>
        <p className='body-m-16'>예시입니다!</p>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    sheetHeight: 420,
    children: '닫힌 상태',
  },
  parameters: { controls: { disable: true } },
};

/**
 * 열린 상태 스냅샷
 */
export const Open: Story = {
  args: {
    isOpen: true,
    sheetHeight: 420,
    children: '열린 상태',
  },
  parameters: { controls: { disable: true } },
};
