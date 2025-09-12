import type { Meta, StoryObj } from '@storybook/react-vite';
import CustomToast from '@shared/components/custom-toast/CustomToast';
import { Icon } from '@shared/components/icon/Icon';

const meta: Meta<typeof CustomToast> = {
  title: 'Components/CustomToast',
  component: CustomToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: '토스트에 표시될 텍스트',
    },
    icon: {
      control: false,
      description: '토스트에 표시될 아이콘',
    },
    children: {
      control: false,
      description: '토스트 내부에 표시될 추가 콘텐츠',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '기본 토스트 메시지입니다.',
  },
};

export const WithIcon: Story = {
  args: {
    text: '아이콘과 함께 표시되는 토스트',
    icon: <Icon name="ic_check" width={16} height={16} />,
  },
};

export const CustomContent: Story = {
  args: {
    icon: <Icon name="ic_camera" width={16} height={16} />,
    children: (
      <div className="flex flex-col gap-[0.4rem]">
        <span className="caption-m-12">사진이 업로드되었습니다</span>
        <span className="caption-m-10 text-grayscale-300">2024.01.15 14:30</span>
      </div>
    ),
  },
};

