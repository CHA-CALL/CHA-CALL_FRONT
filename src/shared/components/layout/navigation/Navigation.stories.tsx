import type { Meta, StoryObj } from '@storybook/react-vite';
import Navigation from '@layout/navigation/Navigation';
import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Layout/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    centerContent: {
      control: { type: 'text' },
      description: '네비게이션 중앙 콘텐츠 (텍스트 혹은 ReactNode)',
    },
    leftIcon: {
      control: false,
      description: '왼쪽 아이콘 (예: 뒤로가기 화살표)',
    },
    rightIcon: {
      control: false,
      description: '오른쪽 아이콘 (예: 메뉴, 검색 등)',
    },
    handleLeftClick: {
      action: 'left clicked',
      description: '왼쪽 아이콘 클릭 이벤트',
    },
    handleRightClick: {
      action: 'right clicked',
      description: '오른쪽 아이콘 클릭 이벤트',
    },
    className: {
      control: { type: 'text' },
      description: '네비게이션 전체 컨테이너에 적용할 추가 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 네비게이션 (텍스트만)
export const Default: Story = {
  args: {
    centerContent: '페이지 제목',
  },
};

// 뒤로가기 버튼이 있는 네비게이션
export const WithBackButton: Story = {
  args: {
    leftIcon: <Icon name='ic_back' />,
    centerContent: '뒤로가기',
  },
};

// 메뉴 버튼이 있는 네비게이션
export const WithMenuButton: Story = {
  args: {
    centerContent: '메뉴',
    rightIcon: (
      <Button variant='chip' buttonStyle='selected1'>
        버튼
      </Button>
    ),
  },
};

// 양쪽에 버튼이 있는 네비게이션
export const WithBothButtons: Story = {
  args: {
    leftIcon: <Icon name='ic_back' />,
    centerContent: '상세 페이지',
    rightIcon: (
      <Button variant='chip' buttonStyle='selected1'>
        버튼
      </Button>
    ),
  },
};
