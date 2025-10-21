import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],

  // TODO: 삭제 (이미지 업로드 테스트용)
  server: {
    proxy: {
      '/s3-proxy': {
        target: 'https://chacall-bucket.s3.ap-northeast-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3-proxy/, ''),
      },
      '/image-proxy': {
        target: 'https://d170atr2wm1a71.cloudfront.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image-proxy/, ''),
      },
    },
  },
});
