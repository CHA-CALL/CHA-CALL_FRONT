import AlertModal from '@components/ui/modal/AlertModal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AlertModal> = {
  title: 'UI/Modal/AlertModal',
  component: AlertModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '확인만 받는 모달',
      },
    },
  },
  args: {
    isOpen: true,
    handleClose: () =>
      console.log('AlertModal: handleClose (확인/닫기 클릭됨)'),
    confirmLabel: '확인',
  },
  argTypes: {
    description: { control: 'text' },
    isOpen: { control: 'boolean' },
    handleClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
  args: {
    title: '저장정보 확인',
    description: '계좌번호가 일치하지 않습니다. 다시 확인해 주세요.',
  },
};

export const LongContent: Story = {
  args: {
    title: '저장정보 확인 저장정보 확인저장정보 확인 저장정보 확인',
    description:
      '저장정보 확인 저장정보 확인저장정보 확인 저장정보 확인저장정보 확인 저장정보 확인저장정보 확인 저장정보 확인저장정보 확인 저장정보 확인저장정보 확인 저장정보 확인',
    confirmLabel: '닫기',
  },
};
