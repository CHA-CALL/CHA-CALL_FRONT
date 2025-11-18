import ConfirmModal from '@components/ui/modal/ConfirmModal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ConfirmModal> = {
  title: 'UI/Modal/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '사용자가 직접 확인하거나 취소가 필요한 작업을 수행할 때 사용.',
      },
    },
  },
  args: {
    isOpen: true,
    handleClose: () => console.log('ConfirmModal: handleClose (배경 클릭 등)'),
    handleConfirm: () => console.log('ConfirmModal: handleConfirm (확인 클릭)'),
    handleCancel: () => console.log('ConfirmModal: handleCancel (취소 클릭)'),
  },
  argTypes: {
    description: { control: 'text' },
    isOpen: { control: 'boolean' },
    handleClose: { table: { disable: true } },
    handleConfirm: { table: { disable: true } },
    handleCancel: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    title: '작성 취소',
    description: '작성 중인 내용이 있습니다. 정말로 나가시겠습니까?',
    confirmLabel: '나가기',
    cancelLabel: '취소',
  },
};

export const DestructiveAction: Story = {
  args: {
    title: '계좌번호 삭제',
    description: '삭제된 계좌번호는 복구할 수 없습니다. 계속하시겠습니까?',
    confirmLabel: '삭제',
    cancelLabel: '취소',
  },
};
