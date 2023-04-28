/// <reference types='vitest' />
/// <reference types='vite/client' />

// import fs from 'fs/promises';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // following is for Vitest config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  build: {
    outDir: './dist',
  },
  optimizeDeps: {
    include: ['cypress'],
  },
  // following is to get RTL working with Vitest (in Vite(st), it's intentional that you cannot load JSX components in .js test files)
  // https://github.com/vitejs/vite/discussions/3448
  // esbuild: {
  //   // loader: "jsx",
  //   // include: /src\/.*\.jsx?$/,
  //   loader: 'tsx',
  //   include: /src\/.*\.[tj]sx?$/,
  //   exclude: [],
  // },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [
  //       {
  //         name: 'load-js-files-as-jsx', // not really accurate
  //         setup(build) {
  //           build.onLoad({ filter: /src\/.*\.[tj]s$/ }, async (args) => ({
  //             loader: 'tsx',
  //             contents: await fs.readFile(args.path, 'utf8'),
  //           }));
  //         },
  //       },
  //     ],
  //   },
  // },
});
