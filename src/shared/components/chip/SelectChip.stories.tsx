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
    totalCount: {
      control: 'number',
      description: '선택 가능한 전체 항목의 수',
    },
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
    totalCount: 10,
    chips: [{ title: 'React' }, { title: 'TypeScript' }, { title: 'Next.js' }],
  },
};

/** 아무 chip도 선택되지 않으면 렌더링 하지 않음. */
export const NoChipsSelected: Story = {
  args: {
    totalCount: 10,
    chips: [],
  },
};

export const WithManyChips: Story = {
  args: {
    totalCount: 20,
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
    ],
  },
};

export const AllChipsSelected: Story = {
  args: {
    totalCount: 5,
    chips: [
      { title: 'Vue' },
      { title: 'Svelte' },
      { title: 'Angular' },
      { title: 'SolidJS' },
      { title: 'Qwik' },
    ],
  },
};
