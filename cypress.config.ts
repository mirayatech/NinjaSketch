import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1512,
    viewportHeight: 982,
    baseUrl: "http://localhost:5173/",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
