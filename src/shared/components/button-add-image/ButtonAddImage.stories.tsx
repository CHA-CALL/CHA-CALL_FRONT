import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonAddImage from './ButtonAddImage';

const meta: Meta<typeof ButtonAddImage> = {
  title: 'Components/ButtonAddImage',
  component: ButtonAddImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: {
      action: 'fileSelected',
      description: '파일 선택 시 실행되는 함수',
    },
    multiple: {
      control: 'boolean',
      description: '다중 파일 선택 허용 여부',
    },
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFileSelect: (file: File) => {
      alert(`첨부한 파일: ${file.name}, ${file.type}, ${file.size}`);
    },
  },
};
