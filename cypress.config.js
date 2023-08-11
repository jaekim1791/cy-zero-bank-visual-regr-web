const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4gk1xn",
  video: false,
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://zero.webappsecurity.com",
    testIsolation: false,
    experimentalRunAllSpecs: true,
  },
});
