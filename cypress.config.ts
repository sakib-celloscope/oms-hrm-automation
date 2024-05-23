import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4300',
    experimentalMemoryManagement: true,
    // Reduce the number of tests kept in memory
    numTestsKeptInMemory: 10,

    // Other e2e configurations
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
