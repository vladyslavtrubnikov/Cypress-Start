const { defineConfig } = require("cypress");
const dotenv = require('dotenv');
dotenv.config();

const selectedUser = process.env.CYPRESS_USER || 'USER1'; 

const envConfig = {
  USER1: {
    baseUrl: process.env.CYPRESS_USER1_baseUrl,
    email: process.env.CYPRESS_USER1_email,
    password: process.env.CYPRESS_USER1_password,
  },
  USER2: {
    baseUrl: process.env.CYPRESS_USER2_baseUrl,
    email: process.env.CYPRESS_USER2_email,
    password: process.env.CYPRESS_USER2_password,
  }
}[selectedUser];



module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: envConfig.baseUrl,
    env: {
      email: envConfig.email,
      password: envConfig.password,
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    }
  },
});
