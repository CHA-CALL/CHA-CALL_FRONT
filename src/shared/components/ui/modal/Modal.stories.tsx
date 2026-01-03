import Modal from '@components/ui/modal/Modal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Modal> = {
  title: 'Components/UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
다목적 모달 컴포넌트입니다. 두 가지 사용 방식을 지원합니다:
1. **Common Mode**: \`title\`, \`description\`, \`footer\` props를 전달하여 표준화된 레이아웃을 빠르게 구성합니다.
2. **Primitive Mode**: \`Modal.Header\`, \`Modal.Body\` 등을 직접 조합하여 복잡한 커스텀 UI를 구성합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: '모달 표시 여부' },
    title: { control: 'text', description: '[Common Mode] 모달 제목' },
    description: { control: 'text', description: '[Common Mode] 본문 내용' },
    children: {
      control: false,
      description: '[Primitive Mode] 커스텀 내부 요소',
    },
    footer: {
      control: false,
      description: '[Common Mode] 푸터 요소 (버튼 등)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * 현재 일반적으로 사용되는 형태.
 * title 속성을 사용한다면 현재 버튼 디자인에 맞게 모달을 채울 수 있음.
 */
export const CommonLayout: Story = {
  args: {
    isOpen: true,
    title: '프로젝트 삭제',
    description:
      '이 프로젝트를 정말 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.',
    handleClose: () => console.info('Close requested'),
    footer: (
      <>
        <button className='rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700'>
          취소
        </button>
        <button className='rounded-md bg-red-500 px-4 py-2 text-sm text-white'>
          삭제하기
        </button>
      </>
    ),
  },
};

/**
 * 추후 모달 내부에 현재 디자인과 다른 내용이 올 경우 대비
 * children으로 Modal.Header, Modal.Body 등을 직접 배치
 */
export const CompositionExample: Story = {
  render: args => (
    <Modal {...args}>
      <Modal.Header>
        <Modal.Title>커스텀 구성 예시</Modal.Title>
        <Modal.Body>
          Alert이나 Confirm으로 해결되지 않는{' '}
          <span className='font-bold text-red-500'>복잡한 UI</span>가 필요할 때
          <br />
          이렇게 직접 조합해서 사용합니다.
        </Modal.Body>
      </Modal.Header>

      <div className='my-4 rounded-lg bg-gray-50 p-4 text-xs text-gray-500'>
        중간에 다른 div를 섞어서 디자인을 변경할 수도 있습니다.
      </div>

      <Modal.Footer className='mt-0 justify-between'>
        <span className='cursor-pointer self-center text-xs text-gray-400 underline'>
          자세히 보기
        </span>
        <button
          className='rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800'
          onClick={() => console.info('커스텀 버튼 클릭')}
        >
          확인
        </button>
      </Modal.Footer>
    </Modal>
  ),
  args: {
    isOpen: true,
    handleClose: () => console.info('Modal: handleClose (Overlay 클릭)'),
  },
};
