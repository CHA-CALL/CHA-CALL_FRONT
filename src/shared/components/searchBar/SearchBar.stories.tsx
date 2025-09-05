import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchBar from '@shared/components/searchBar/SearchBar';
import { Icon } from '@shared/components/icon/Icon';
import Button from '@shared/components/button/Button';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
    value: '',
    placeholder: '검색어를 입력하세요',
    rightComponent: <Icon name='ic_search' />,
  },
};

// 아이콘 타입 검색바 (최대 길이 제한)
export const IconTypeWithMaxLength: Story = {
  args: {
    value: '',
    placeholder: '검색어를 입력하세요',
    maxLength: 20,
    rightComponent: <Icon name='ic_search' />,
  },
};

// 버튼 타입 검색바
export const ButtonType: Story = {
  args: {
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
    value: '',
    placeholder: '검색어를 입력하세요',
    maxLength: 20,
  },
};

// 긴 텍스트 테스트용 검색바
export const WithLongText: Story = {
  args: {
    value:
      '이것은 매우 긴 검색어입니다. 텍스트가 길어졌을 때 어떻게 표시되는지 확인하기 위한 테스트입니다.',
    placeholder: '검색어를 입력하세요',
    rightComponent: <Icon name='ic_search' />,
  },
};
