/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
require('dotenv').config()

/**
 * This function is called when a project is opened or re-opened (e.g. due to
 * the project's config changing)
 * 
 * - `on` is used to hook into various events Cypress emits
 * - `config` is the resolved Cypress config
 */
const plugin: Cypress.PluginConfig = (_on, config) => {
  return {
    ...config,
    baseUrl: process.env.CYPRESS_BASE_URL,
    chromeWebSecurity: false, 
    defaultCommandTimeout: 10000,
    env: {
      ...config.env,
      EMAIL: process.env.CYPRESS_EMAIL,
      PASSWORD: process.env.CYPRESS_PASSWORD,
    },
  }
}

export default plugin
