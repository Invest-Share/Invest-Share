import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    GITHUB_EMAIL: 'upnata@gmail.com',
    GITHUB_PW: 'fiona!94',
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
