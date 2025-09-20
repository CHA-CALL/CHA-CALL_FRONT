import type { Meta, StoryObj } from '@storybook/react-vite';
import Information from '@shared/components/information/Information';

const meta: Meta<typeof Information> = {
  title: 'Components/Information',
  component: Information,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconId: {
      control: 'select',
      options: [
        'ic_chat',
        'ic_check',
        'ic_close',
        'ic_error',
        'ic_confirm',
        'ic_locate',
        'ic_mypage',
        'ic_next',
        'ic_search',
        'ic_trash',
        'ic_support',
        'ic_back',
        'ic_register',
        'ic_team',
        'ic_calendar',
        'ic_dash',
        'ic_close_white',
        'ic_camera',
        'ic_filter',
        'ic_down',
        'ic_up',
        'ic_error_small',
        'ic_dot',
      ],
      description: '아이콘 ID',
    },
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconId: 'ic_chat',
    text: '한번 등록하면 채팅에서 바로 내용 전송이 가능해요!',
  },
};

export const WithCheckIcon: Story = {
  args: {
    iconId: 'ic_check',
    text: '작업이 완료되었습니다.',
  },
};

export const WithErrorIcon: Story = {
  args: {
    iconId: 'ic_error',
    text: '오류가 발생했습니다. 다시 시도해주세요.',
  },
};
