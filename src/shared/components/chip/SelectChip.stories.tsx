import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectChip } from './SelectChip';

const meta: Meta<typeof SelectChip> = {
  title: 'Components/SelectChip',
  component: SelectChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    chips: {
      control: 'object',
      description: '현재 선택된 칩들의 배열',
    },
    handleDeleteChip: {
      action: 'deleted',
      description: '칩의 x 버튼 클릭 시 호출되는 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chips: [{ title: 'React' }, { title: 'TypeScript' }, { title: 'Next.js' }],
  },
};

/** 아무 chip도 선택되지 않으면 렌더링 하지 않음. */
export const NoChipsSelected: Story = {
  args: {
    chips: [],
  },
};

export const AllChipsSelected: Story = {
  args: {
    chips: [
      { title: 'JavaScript' },
      { title: 'React' },
      { title: 'TypeScript' },
      { title: 'Next.js' },
      { title: 'Tailwind CSS' },
      { title: 'Storybook' },
      { title: 'Vite' },
      { title: 'Jest' },
      { title: 'React Query' },
      { title: 'Tanstack Query' },
    ],
  },
};

