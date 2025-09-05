import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonClose from './ButtonClose';

const meta: Meta<typeof ButtonClose> = {
  title: 'Components/ButtonClose',
  component: ButtonClose,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: '클릭 시 실행 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert('닫기 버튼 클릭'),
  },
};

export const WithContainer: Story = {
  render: () => (
    <div className='relative inline-block'>
      <div className='w-[8rem] h-[8rem] bg-grayscale-200 rounded-[1.6rem]' />
      <ButtonClose
        onClick={() => alert('닫기 버튼 클릭')}
        className='absolute top-[-0.6rem] right-[-1rem]'
      />
    </div>
  ),
};


