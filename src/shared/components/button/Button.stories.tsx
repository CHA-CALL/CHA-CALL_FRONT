import type { Meta, StoryObj } from '@storybook/react-vite';
import Button, { ButtonClasses } from '@shared/components/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(ButtonClasses),
      description: '버튼의 스타일 변형',
    },
    buttonStyle: {
      control: { type: 'select' },
      options: [
        'active',
        'disabled',
        'sub',
        'default',
        'selected1',
        'selected2',
      ],
      description: '버튼의 스타일 상태',
    },
    handleClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
    children: {
      control: { type: 'text' },
      description: '버튼 내부 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// CTA 버튼 스토리
export const CTA: Story = {
  args: {
    variant: 'cta',
    buttonStyle: 'active',
    children: 'CTA 버튼',
  },
};

export const CTADisabled: Story = {
  args: {
    variant: 'cta',
    buttonStyle: 'disabled',
    children: '비활성화된 CTA',
  },
};

export const CTASub: Story = {
  args: {
    variant: 'cta',
    buttonStyle: 'sub',
    children: '서브 CTA',
  },
};

// Chip 버튼 스토리
export const Chip: Story = {
  args: {
    variant: 'chip',
    buttonStyle: 'default',
    children: '칩 버튼',
  },
};

export const ChipSelected1: Story = {
  args: {
    variant: 'chip',
    buttonStyle: 'selected1',
    children: '선택된 칩 1',
  },
};

export const ChipSelected2: Story = {
  args: {
    variant: 'chip',
    buttonStyle: 'selected2',
    children: '선택된 칩 2',
  },
};

// Verify 버튼 스토리
export const Verify: Story = {
  args: {
    variant: 'verify',
    buttonStyle: 'active',
    children: '인증',
  },
};

export const VerifyDisabled: Story = {
  args: {
    variant: 'verify',
    buttonStyle: 'disabled',
    children: '비활성화',
  },
};
