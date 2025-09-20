import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Overlay from '@shared/components/overlay/Overlay';
import Button from '@shared/components/button/Button';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['center', 'bottom', 'top', 'left', 'right'],
    },
    isOpen: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Modal Story
export const Modal: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='p-[2rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          모달 열기
        </Button>

        <Overlay {...args} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className='flex min-w-[27.4rem] flex-col rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
            <h3 className='mb-[2rem] text-[1.8rem] font-bold'>모달 제목</h3>
            <p className='mb-[2rem]'>모달 내용입니다.</p>
            <div className='flex gap-[1rem]'>
              <Button
                variant='cta'
                buttonStyle='sub'
                handleClickButton={() => setIsOpen(false)}
              >
                취소
              </Button>
              <Button
                variant='cta'
                buttonStyle='active'
                handleClickButton={() => setIsOpen(false)}
              >
                확인
              </Button>
            </div>
          </div>
        </Overlay>
      </div>
    );
  },
  args: {
    position: 'center',
    isOpen: false,
  },
};

// BottomSheet Story
export const BottomSheet: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='p-[2rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          바텀시트 열기
        </Button>

        <Overlay {...args} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className='fixed bottom-[0rem] left-1/2 flex w-full max-w-[60rem] -translate-x-1/2 flex-col rounded-t-[3.2rem] bg-white px-[3.2rem] transition-transform duration-300 ease-in-out'>
            <div className='bg-grayscale-300 mx-auto my-[1rem] h-[0.35rem] w-[4.1rem] rounded-[10rem]' />
            <div className='mb-[3.4rem] mt-[2.8rem]'>
              <h3 className='mb-[2rem] text-[1.8rem] font-bold'>
                바텀시트 내용
              </h3>
              <p className='mb-[2rem]'>이것은 바텀시트의 내용입니다.</p>
              <Button
                variant='cta'
                buttonStyle='sub'
                handleClickButton={() => setIsOpen(false)}
              >
                닫기
              </Button>
            </div>
          </div>
        </Overlay>
      </div>
    );
  },
  args: {
    position: 'bottom',
    isOpen: false,
  },
};

// Top Position Story
export const TopPosition: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='p-[2rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          상단 오버레이 열기
        </Button>

        <Overlay {...args} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className='flex min-w-[27.4rem] flex-col rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
            <h3 className='mb-[2rem] text-[1.8rem] font-bold'>상단 오버레이</h3>
            <p className='mb-[2rem]'>상단에서 나타나는 오버레이입니다.</p>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={() => setIsOpen(false)}
            >
              닫기
            </Button>
          </div>
        </Overlay>
      </div>
    );
  },
  args: {
    position: 'top',
    isOpen: false,
  },
};

// Left Position Story
export const LeftPosition: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='p-[2rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          좌측 오버레이 열기
        </Button>

        <Overlay {...args} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className='flex min-w-[27.4rem] flex-col rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
            <h3 className='mb-[2rem] text-[1.8rem] font-bold'>좌측 오버레이</h3>
            <p className='mb-[2rem]'>좌측에서 나타나는 오버레이입니다.</p>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={() => setIsOpen(false)}
            >
              닫기
            </Button>
          </div>
        </Overlay>
      </div>
    );
  },
  args: {
    position: 'left',
    isOpen: false,
  },
};

// Right Position Story
export const RightPosition: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='p-[2rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={() => setIsOpen(true)}
        >
          우측 오버레이 열기
        </Button>

        <Overlay {...args} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className='flex min-w-[27.4rem] flex-col rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
            <h3 className='mb-[2rem] text-[1.8rem] font-bold'>우측 오버레이</h3>
            <p className='mb-[2rem]'>우측에서 나타나는 오버레이입니다.</p>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={() => setIsOpen(false)}
            >
              닫기
            </Button>
          </div>
        </Overlay>
      </div>
    );
  },
  args: {
    position: 'right',
    isOpen: false,
  },
};
