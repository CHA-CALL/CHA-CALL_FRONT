// src/shared/ui/Icon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, type IconId } from './Icon';

const iconIds: IconId[] = [
  'ic_chat',
  'ic_check',
  'ic_close',
  'ic_confirm',
  'ic_error',
  'ic_locate',
  'ic_mypage',
  'ic_next',
  'ic_register',
  'ic_search',
  'ic_support',
  'ic_team',
  'ic_trash',
  'ic_back',
  'ic_calendar',
];

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'select', options: iconIds },
    width: { control: { type: 'range', min: 12, max: 64, step: 2 } },
    height: { control: { type: 'range', min: 12, max: 64, step: 2 } },
    title: { control: 'text' },
    className: { control: false },
    style: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'SVG 스프라이트의 `<symbol>`을 `<use href="#id">`로 사용하는 아이콘 컴포넌트입니다. 스토리북에서는 전역 데코레이터로 스프라이트를 1회 주입합니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    name: 'ic_search',
    width: 22,
    height: 22,
    title: '검색',
  },
};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 16,
      }}
    >
      {iconIds.map(id => (
        <div
          key={id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: 8,
            border: '1px solid #eee',
            borderRadius: 8,
          }}
        >
          <Icon name={id} width={24} height={24} />
          <code style={{ fontSize: 12 }}>{id}</code>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {[16, 20, 24, 32, 40, 48].map(s => (
        <div key={s} style={{ textAlign: 'center' }}>
          <Icon name='ic_search' width={s} height={s} />
          <div style={{ fontSize: 12, marginTop: 6 }}>{s}px</div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
