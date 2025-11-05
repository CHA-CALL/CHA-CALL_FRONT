import type { Meta, StoryObj } from '@storybook/react-vite';
import Tag from '@ui/tag/Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '태그에 표시될 텍스트',
    },
  },
  args: {
    title: '기본 태그',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title: 'TypeScript와 Storybook 함께 사용하기',
  },
};

export const ShortTitle: Story = {
  args: {
    title: 'Next',
  },
};
