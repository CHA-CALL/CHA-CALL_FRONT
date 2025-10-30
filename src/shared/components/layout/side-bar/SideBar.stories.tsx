import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SideBar from '@layout/side-bar/SideBar';
import Button from '@ui/button/Button';

const meta: Meta<typeof SideBar> = {
  title: 'Components/Layout/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className='h-[80rem]'>
        <SideBar isOpen={isOpen} handleSideBarClose={() => setIsOpen(false)} />
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
