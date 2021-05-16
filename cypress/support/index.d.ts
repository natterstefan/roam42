/* eslint-disable @typescript-eslint/naming-convention */
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login to Roam
     * @example cy.login('')
     */
    login(): Chainable<Subject>
  }
}
