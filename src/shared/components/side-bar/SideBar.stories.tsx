import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SideBar from '@components/side-bar/SideBar';
import Button from '@components/button/Button';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    userType: {
      control: 'select',
      options: ['guest', 'customer', 'manager']
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Guest: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className='h-[80rem]'>
        <SideBar
          isOpen={isOpen}
          userType='guest'
          handleSideBarClose={() => setIsOpen(false)}
        />
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          사이드바 열기
        </Button>
      </div>
    );
  },
};

export const Customer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className='h-[80rem]'>
        <SideBar
          isOpen={isOpen}
          userType='customer'
          handleSideBarClose={() => setIsOpen(false)}
        />
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          사이드바 열기
        </Button>
      </div>
    );
  },
};

export const Manager: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className='h-[80rem]'>
        <SideBar
          isOpen={isOpen}
          userType='manager'
          handleSideBarClose={() => setIsOpen(false)}
        />
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          사이드바 열기
        </Button>
      </div>
    );
  },
};
