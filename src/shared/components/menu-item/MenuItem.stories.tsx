import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuItem from '@components/menu-item/MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasToggleSwitch: {
      control: { type: 'boolean' },
      description: '토글 스위치 표시 여부',
    },
    menu: {
      control: { type: 'object' },
      description: '메뉴 정보',
    },
    isToggled: {
      control: { type: 'boolean' },
      description: '토글 스위치 상태',
    },
    handleMenuClick: {
      action: 'clicked',
      description: '메뉴 아이템 클릭 이벤트 핸들러',
    },
    handleToggle: {
      action: 'toggled',
      description: '토글 스위치 클릭 이벤트 핸들러',
    },
    isLast: {
      control: { type: 'boolean' },
      description: '마지막 메뉴 아이템 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 메뉴
export const Default: Story = {
  args: {
    menu: {
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
      name: '화이타',
      description:
        '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
      price: 18000,
    },
    isLast: false,
  },
};

// 토글 메뉴
export const Toggled: Story = {
  args: {
    hasToggleSwitch: true,
    menu: {
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
      name: '화이타',
      description:
        '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
      price: 20000,
    },
    isToggled: true,
    handleMenuClick: () => {},
    handleToggle: () => {},
    isLast: false,
  },
};

// 기본 메뉴 리스트
export const MenuList: Story = {
  render: () => (
    <div className='flex w-[40rem] flex-col bg-white p-[2rem]'>
      <MenuItem
        menu={{
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
          name: '화이타',
          description:
            '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
          price: 18000,
        }}
      />
      <MenuItem
        menu={{
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
          name: '화이타',
          description:
            '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
          price: 20000,
        }}
      />
      <MenuItem
        menu={{
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
          name: '화이타',
          description:
            '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
          price: 19000,
        }}
        isLast={true}
      />
    </div>
  ),
};

// 토글 메뉴 리스트
export const ToggledMenuList: Story = {
  render: () => (
    <div className='flex w-[40rem] flex-col bg-white p-[2rem]'>
      <MenuItem
        hasToggleSwitch={true}
        menu={{
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
          name: '화이타',
          description:
            '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
          price: 18000,
        }}
        isToggled={true}
        handleMenuClick={() => {}}
        handleToggle={() => {}}
      />
      <MenuItem
        hasToggleSwitch={true}
        menu={{
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
          name: '화이타',
          description:
            '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
          price: 20000,
        }}
        isToggled={false}
        handleMenuClick={() => {}}
        handleToggle={() => {}}
      />
      <MenuItem
        hasToggleSwitch={true}
        menu={{
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/12/09/08/18/food-3007395_1280.jpg',
          name: '화이타',
          description:
            '새우, 치킨, 돼지고기와 부재료를 또띠아와 함께 싸서 먹는 메뉴',
          price: 19000,
        }}
        isToggled={true}
        handleMenuClick={() => {}}
        handleToggle={() => {}}
        isLast={true}
      />
    </div>
  ),
};
