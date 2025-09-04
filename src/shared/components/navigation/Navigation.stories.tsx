import type { Meta, StoryObj } from '@storybook/react-vite';
import Navigation from './Navigation';
import Button from '../button/Button';
import { Icon } from '../icon/Icon';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: '네비게이션 중앙 텍스트',
    },
    leftIcon: {
      control: { type: 'text' },
      description: '왼쪽 아이콘 (예: 뒤로가기 화살표)',
    },
    rightIcon: {
      control: { type: 'text' },
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 네비게이션 (텍스트만)
export const Default: Story = {
  args: {
    text: '페이지 제목',
  },
};

// 뒤로가기 버튼이 있는 네비게이션
export const WithBackButton: Story = {
  args: {
    leftIcon: <Icon name='ic_back' />,
    text: '뒤로가기',
  },
};

// 메뉴 버튼이 있는 네비게이션
export const WithMenuButton: Story = {
  args: {
    text: '메뉴',
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
    text: '상세 페이지',
    rightIcon: (
      <Button variant='chip' buttonStyle='selected1'>
        버튼
      </Button>
    ),
  },
};
