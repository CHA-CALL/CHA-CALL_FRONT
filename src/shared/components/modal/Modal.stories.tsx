import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Modal from './Modal';
import Button from '@components/button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    cancelChildren: { control: 'text' },
    confirmChildren: { control: 'text' },
    handleCancelClick: { action: 'cancelled' },
    handleConfirmClick: { action: 'confirmed' },
    isOpen: { control: 'boolean' },
    handleModalClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='flex items-center justify-center h-[80vh] mx-[40rem]'>
        <Modal
          isOpen={isOpen}
          title='신청하시겠습니까?'
          content='최종 승인까지 영업일 기준 3-5일이 소요돼요.'
          cancelChildren='취소'
          confirmChildren='확인'
          handleCancelClick={() => {alert('취소 버튼 클릭');}}
          handleConfirmClick={() => {alert('확인 버튼 클릭');}}
          handleModalClose={() => setIsOpen(false)}
        />
        <Button
          children='모달 열기'
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        />
      </div>
    );
  },
};
