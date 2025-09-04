import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/shared/styles/global.css';

import SvgSprite from '../src/assets/svg/SvgSprite';

const withSvgSprite = Story => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(SvgSprite, null),
    React.createElement(Story, null)
  );
};

const preview: Preview = {
  decorators: [withSvgSprite],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
