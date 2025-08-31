import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, type BadgeProps } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Shared/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
    },
    rounded: {
      control: { type: 'inline-radio' },
      options: ['md', 'full'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: 'neutral' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Success: Story = { args: { variant: 'success' } };
export const Warning: Story = { args: { variant: 'warning' } };
export const Danger: Story = { args: { variant: 'danger' } };

export const WithIcons: Story = {
  args: {
    children: 'With icons',
    startAdornment: <span>✅</span>,
    endAdornment: <span>↗</span>,
    variant: 'primary',
    size: 'md',
    rounded: 'full',
  } as BadgeProps,
};
