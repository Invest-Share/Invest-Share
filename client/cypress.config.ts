import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    supportFile: './cypress/support/component.ts',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
  },
});
