import '@testing-library/cypress/add-commands';
import 'cypress-wait-until';
// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Login handling inspired
 * @see https://docs.cypress.io/guides/references/best-practices#Having-tests-rely-on-the-state-of-previous-tests
 * @see https://docs.cypress.io/api/cypress-api/cookies#Preserve-cookies-through-multiple-tests
 */
Cypress.Commands.add('login', function () {
  /* reset everything */
  cy.clearCookies()
  cy.clearLocalStorage()

  /**
   * Disable Cache in Cypress
   * @see https://github.com/cypress-io/cypress/issues/14459#issuecomment-768616195
   * 
   * Other examples
   * @see https://www.cypress.io/blog/2020/11/12/testing-application-in-offline-network-mode/
   */
  if (Cypress.browser.family === 'chromium') {
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.enable',
      params: {}
    });
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    });
  }

  /**
   * intercept requests to .js files
   * 
   * If there's a cache issue consider applying these solutions:
   * @see https://glebbahmutov.com/blog/cypress-intercept-problems/#cached-response
   * @see https://docs.cypress.io/api/commands/intercept#See-also
   */
  cy.intercept(
    {
      method: 'POST',
      url: new RegExp(/https:\/\/www.googleapis.com\/identitytoolkit\/v3\/relyingparty\/verifyPassword/)
    }
  ).as('login')
  cy.intercept('http://localhost:5000/dist/libs.js').as('libs')

  // start login process
  cy.visit('')
  cy.title().should('eq', 'Daily Notes');
  cy.get('.loading-astrolabe').should('not.exist');
    
  /**
   * Test if we are logged in or not
   * 
   * Docs - Conditional Testing
   * @see https://stackoverflow.com/a/57567635/1238150
   * @see https://docs.cypress.io/guides/core-concepts/conditional-testing#The-DOM-is-unstable
   */
  cy.get('body').then($body => {
    // NOTE: `selector` does not work here, but I do not know why yet
    if ($body.find('input[type=password]').length === 1) {
      const selector = '#app input[name="email"]'
      cy.log('Logging in...')

      cy.get(selector)
        .first()
        .type(Cypress.env('EMAIL'))
      cy.get('#app input[type=password]')
        .last()
        .type(Cypress.env('PASSWORD'))
      cy.get('#app button')
        .first()
        .click()

      cy.wait('@login').its('response.statusCode').should('eq', 200)
      // when it's gone we are logged in
      cy.get('#app button').should('not.exist')
    } else {
      cy.log('Already logged in')
    }
  })
})