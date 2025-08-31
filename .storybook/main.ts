import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook', // 협업용 호스팅, 시각 회귀 테스트
    '@storybook/addon-docs', // 자동 docs 추가
    '@storybook/addon-a11y', // 접근성 검사 패널 추가(aria, 키보드 포커스 이슈 등)
    '@storybook/addon-vitest', // Storybook ui에 표시하는 탭/배지 등을 제공
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
