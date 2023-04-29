import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    // will need to populate these variables to make E2E test work!
    GITHUB_EMAIL: '',
    GITHUB_PW: '',
  },

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
