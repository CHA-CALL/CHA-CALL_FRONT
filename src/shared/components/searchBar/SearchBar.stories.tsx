import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchBar from './SearchBar';
import { Icon } from '../icon/Icon';
import Button from '../button/Button';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['icon', 'button'],
      description: '검색바의 타입 (아이콘 또는 버튼)',
    },
    value: {
      control: { type: 'text' },
      description: '검색바의 입력값',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'placeholder 텍스트',
    },
    maxLength: {
      control: { type: 'number' },
      description: '최대 입력 길이',
    },
    rightComponent: {
      control: { type: 'text' },
      description: '오른쪽에 표시할 컴포넌트 (아이콘 또는 버튼)',
    },
    handleRightClick: {
      action: 'right clicked',
      description: '오른쪽 컴포넌트 클릭 이벤트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 검색바 (아이콘 타입)
export const WithIcon: Story = {
  args: {
    type: 'icon',
    value: '',
    placeholder: '검색어를 입력하세요',
    rightComponent: <Icon name='ic_search' />,
  },
};

// 아이콘 타입 검색바 (최대 길이 제한)
export const IconTypeWithMaxLength: Story = {
  args: {
    type: 'icon',
    value: '',
    placeholder: '검색어를 입력하세요',
    maxLength: 20,
    rightComponent: <Icon name='ic_search' />,
  },
};

// 버튼 타입 검색바
export const ButtonType: Story = {
  args: {
    type: 'button',
    value: '',
    placeholder: '검색어를 입력하세요',
    rightComponent: (
      <Button variant='verify' buttonStyle='active'>
        버튼
      </Button>
    ),
  },
};

// 최대 길이가 있는 검색바
export const WithMaxLengthAndButton: Story = {
  args: {
    type: 'button',
    value: '',
    placeholder: '검색어를 입력하세요',
    maxLength: 15,
    rightComponent: (
      <Button variant='verify' buttonStyle='active'>
        버튼
      </Button>
    ),
  },
};

// 오른쪽 컴포넌트가 없는 검색바
export const WithMaxLength: Story = {
  args: {
    type: 'icon',
    value: '',
    placeholder: '검색어를 입력하세요',
    maxLength: 20,
  },
};
