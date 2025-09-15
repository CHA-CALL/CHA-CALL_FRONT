import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorText from './ErrorText';

const meta: Meta<typeof ErrorText> = {
  title: 'Shared/ErrorText',
  component: ErrorText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '에러 메시지 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '이 필드는 필수입니다.',
  },
};

export const LongText: Story = {
  args: {
    text: '파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.',
  },
};

export const ShortText: Story = {
  args: {
    text: '오류',
  },
};

export const ValidationError: Story = {
  args: {
    text: '올바른 이메일 형식을 입력해주세요.',
  },
};

export const FileUploadError: Story = {
  args: {
    text: '지원하지 않는 파일 형식입니다.',
  },
};
