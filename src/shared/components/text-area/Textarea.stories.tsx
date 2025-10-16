import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Textarea from '@shared/components/text-area/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'textarea의 값',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'placeholder 텍스트',
    },
    maxLength: {
      control: { type: 'number' },
      description: '최대 글자 수',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: '읽기 전용 상태',
    },
    rows: {
      control: { type: 'number' },
      description: 'textarea의 행 수',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 textarea
export const Default: Story = {
  args: {
    value: '',
    placeholder: '텍스트를 입력해주세요.',
    maxLength: 100,
  },
  render: args => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div className='w-[40rem]'>
        <Textarea
          {...args}
          value={value}
          handleChange={e => setValue(e.target.value)}
        />
      </div>
    );
  },
};

// 글자 수 제한이 있는 textarea
export const WithMaxLength: Story = {
  args: {
    value: '',
    placeholder: '최대 50자까지 입력 가능합니다.',
    maxLength: 50,
  },
  render: args => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div className='w-[40rem]'>
        <Textarea
          {...args}
          value={value}
          handleChange={e => setValue(e.target.value)}
        />
      </div>
    );
  },
};

// 비활성화된 textarea
export const Disabled: Story = {
  args: {
    value: '비활성화된 textarea입니다.',
    placeholder: '텍스트를 입력해주세요.',
    disabled: true,
  },
  render: args => {
    return (
      <div className='w-[40rem]'>
        <Textarea {...args} handleChange={() => {}} />
      </div>
    );
  },
};

// 읽기 전용 textarea
export const ReadOnly: Story = {
  args: {
    value: '읽기 전용 textarea입니다. 수정할 수 없습니다.',
    placeholder: '텍스트를 입력해주세요.',
    readOnly: true,
  },
  render: args => {
    return (
      <div className='w-[40rem]'>
        <Textarea {...args} handleChange={() => {}} />
      </div>
    );
  },
};

// 커스텀 높이 textarea
export const CustomHeight: Story = {
  args: {
    value: '',
    placeholder: '높이가 조정된 textarea입니다.',
    className: 'h-[20rem]',
  },
  render: args => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div className='w-[40rem]'>
        <Textarea
          {...args}
          value={value}
          handleChange={e => setValue(e.target.value)}
        />
      </div>
    );
  },
};

// 여러 행의 textarea
export const MultipleRows: Story = {
  args: {
    value: '',
    placeholder: '여러 행의 textarea입니다.',
    rows: 8,
  },
  render: args => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div className='w-[40rem]'>
        <Textarea
          {...args}
          value={value}
          handleChange={e => setValue(e.target.value)}
        />
      </div>
    );
  },
};

// 에러 상태 textarea
export const Error: Story = {
  args: {
    value: '',
    placeholder: '에러 상태의 textarea입니다.',
    className: 'border-red-500 focus:border-red-500',
  },
  render: args => {
    const [value, setValue] = useState(args.value || '');
    return (
      <div className='w-[40rem]'>
        <Textarea
          {...args}
          value={value}
          handleChange={e => setValue(e.target.value)}
        />
        <div className='mt-1 text-sm text-red-500'>
          에러 메시지가 표시됩니다.
        </div>
      </div>
    );
  },
};
