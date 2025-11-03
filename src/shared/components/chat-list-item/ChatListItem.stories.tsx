import ChatListItem from '@components/chat-list-item/ChatListItem';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof ChatListItem> = {
  title: 'Components/ChatListItem',
  component: ChatListItem,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    profileImage: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
    isEditing: {
      control: 'boolean',
      description:
        '편집 모드 활성화 여부. true인 경우에 컴포넌트 전체에 클릭 이벤트 발생',
    },
    clientName: {
      control: 'text',
      description: '고객 이름',
    },
    tagTitle: {
      control: 'text',
      description: '고객에게 붙은 태그',
    },
    lastChat: {
      control: 'text',
      description: '마지막으로 수신된 채팅 메시지',
    },
    lastChatTime: {
      control: 'text',
      description: '마지막 채팅 수신 시간',
    },
    unreadCount: {
      control: 'number',
      description: '읽지 않은 메시지 수',
    },
    isChecked: {
      control: 'boolean',
      description: '편집 모드에서 체크박스 선택 여부',
    },
    handleCheckChange: {
      action: 'checkedChange',
      description: '체크 상태 변경 시 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  profileImage: 'https://via.placeholder.com/52',
  clientName: '고객이름',
  tagTitle: '고고 푸드트럭',
  lastChatTime: '오후 3:40',
  isEditing: false,
  isChecked: false,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    lastChat: '네, 확인했습니다. 내일 연락드리겠습니다.',
    unreadCount: 3,
  },
};

export const Read: Story = {
  args: {
    ...defaultArgs,
    lastChat: '감사합니다! 좋은 하루 되세요.',
    unreadCount: 0,
  },
};

export const LongText: Story = {
  args: {
    ...defaultArgs,
    clientName: '건국대학교 총학생회 축제준비위원회 부팀장 고객님',
    lastChat:
      '안녕하세요, 문의주신 내용에 대한 답변입니다. 저희 학교의 축제를 맞이하여 총 7대의 푸드트럭을 각 건물 앞에 요청드리려고 합니다.',
    unreadCount: 1,
  },
};

export const NoProfileImage: Story = {
  args: {
    ...defaultArgs,
    profileImage: '',
    lastChat: '프로필 이미지가 없는 사용자입니다.',
    unreadCount: 0,
  },
};

export const EditingMode: Story = {
  args: {
    ...Default.args,
    isEditing: true,
  },
};

export const EditingModeChecked: Story = {
  args: {
    ...Default.args,
    isEditing: true,
    isChecked: true,
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    isEditing: true,
  },
  render: args => {
    const [isChecked, setIsChecked] = useState(args.isChecked);

    return (
      <ChatListItem
        {...args}
        isChecked={isChecked}
        handleCheckChange={checked => {
          args.handleCheckChange(checked);
          setIsChecked(checked);
        }}
      />
    );
  },
};
