import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchBar from './SearchBar';

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
export const Default: Story = {
  args: {
    type: 'icon',
    value: '',
    rightComponent: '🔍',
  },
};

// 아이콘 타입 검색바 (텍스트 입력됨)
export const IconTypeWithText: Story = {
  args: {
    type: 'icon',
    value: '검색어를 입력하세요',
    rightComponent: '🔍',
  },
};

// 아이콘 타입 검색바 (최대 길이 제한)
export const IconTypeWithMaxLength: Story = {
  args: {
    type: 'icon',
    value: '검색어',
    maxLength: 20,
    rightComponent: '🔍',
  },
};

// 버튼 타입 검색바
export const ButtonType: Story = {
  args: {
    type: 'button',
    value: '',
    rightComponent: '→',
  },
};

// 버튼 타입 검색바 (텍스트 입력됨)
export const ButtonTypeWithText: Story = {
  args: {
    type: 'button',
    value: '검색어',
    rightComponent: '→',
  },
};

// 최대 길이가 있는 검색바
export const WithMaxLength: Story = {
  args: {
    type: 'icon',
    value: '긴 검색어입니다',
    maxLength: 15,
    rightComponent: '🔍',
  },
};

// 오른쪽 컴포넌트가 없는 검색바
export const WithoutRightComponent: Story = {
  args: {
    type: 'icon',
    value: '검색어',
    maxLength: 20,
  },
};

// 모든 variant를 한번에 보여주는 스토리
export const AllVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>아이콘 타입</h3>
        <SearchBar type='icon' value='' rightComponent='🔍' />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-2'>
          아이콘 타입 (텍스트 입력)
        </h3>
        <SearchBar
          type='icon'
          value='검색어'
          maxLength={20}
          rightComponent='🔍'
        />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-2'>버튼 타입</h3>
        <SearchBar type='button' value='' rightComponent='→' />
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-2'>버튼 타입 (텍스트 입력)</h3>
        <SearchBar type='button' value='검색어' rightComponent='→' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 검색바 variant를 한번에 확인할 수 있습니다.',
      },
    },
  },
};
