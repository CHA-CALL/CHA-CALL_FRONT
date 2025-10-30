import type { Meta, StoryObj } from '@storybook/react-vite';
import ImagePreview from '@ui/image-preview/ImagePreview';

const meta: Meta<typeof ImagePreview> = {
  title: 'Components/UI/ImagePreview',
  component: ImagePreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    handleClose: {
      action: 'closed',
      description: '닫기 버튼 클릭 이벤트 핸들러',
    },
    src: {
      control: { type: 'text' },
      description: '이미지 미리보기 내부 콘텐츠',
    },
    alt: {
      control: { type: 'text' },
      description: '이미지 미리보기 내부 콘텐츠',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 이미지 미리보기
export const Default: Story = {
  args: {
    handleClose: () => {},
    src: 'https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg',
    alt: '미리보기 이미지',
  },
};
