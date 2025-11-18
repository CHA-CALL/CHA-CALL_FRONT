import Modal from '@components/ui/modal/Modal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal/PrimitiveModal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '가장 기초적인 모달 컨테이너입니다. Header, Title, Body, Footer를 조합하여 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const CompositionExample: Story = {
  render: args => (
    <Modal {...args}>
      <Modal.Header>
        <Modal.Title>커스텀 구성 예시</Modal.Title>
        <Modal.Body>
          Alert이나 Confirm으로 해결되지 않는 복잡한 UI가 필요할 때<br />
          이렇게 직접 조합해서 사용합니다.
        </Modal.Body>
      </Modal.Header>

      <Modal.Footer className='mt-4 justify-between'>
        <span className='self-center text-xs text-gray-500'>도움말 보기</span>
        <button
          className='rounded-md bg-black px-4 py-2 text-white'
          onClick={() => console.log('커스텀 버튼 클릭')}
        >
          이해했습니다
        </button>
      </Modal.Footer>
    </Modal>
  ),
  args: {
    isOpen: true,
    handleClose: () => console.log('Modal: handleClose (Overlay 클릭)'),
  },
};
