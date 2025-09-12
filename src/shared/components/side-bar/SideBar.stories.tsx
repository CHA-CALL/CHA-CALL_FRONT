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
          handleLogin={() => alert('로그인/회원가입 클릭')}
          handleClickMyPage={() => alert('마이페이지 클릭')}
          handleClickChat={() => alert('채팅 클릭')}
          handleClickSupport={() => alert('문의하기 클릭')}
          handleClickTeam={() => alert('팀 소개 클릭')}
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
          handleLogout={() => alert('로그아웃 클릭')}
          handleSwitchToManager={() => alert('사장님 전환 클릭')}
          handleClickMyPage={() => alert('마이페이지 클릭')}
          handleClickChat={() => alert('채팅 클릭')}
          handleClickSupport={() => alert('문의하기 클릭')}
          handleClickTeam={() => alert('팀 소개 클릭')}
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
          handleLogout={() => alert('로그아웃 클릭')}
          handleSwitchToCustomer={() => alert('고객 전환 클릭')}
          handleClickMyPage={() => alert('마이페이지 클릭')}
          handleClickChat={() => alert('채팅 클릭')}
          handleClickRegister={() => alert('푸드트럭 등록하기 클릭')}
          handleClickSupport={() => alert('문의하기 클릭')}
          handleClickTeam={() => alert('팀 소개 클릭')}
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
