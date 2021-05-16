/// <reference types="../../support" />

context('smartBlocks', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce()
  })

  afterEach(() => {
    cy.get('.roam-block-container')
    .first()
    .click()
    .clear()
  })
  
  it('can open smartblock menu', () => {
    // reload to make sure the libs are reloaded again
    cy.reload()
    cy.wait('@libs').its('response.statusCode').should('eq', 200)

    // we are logged in and should see the main screen of Roam
    cy.get('.roam-main').should('be.visible');
    
    // wait until Tribute is ready
    cy.waitUntil(() => cy.window().then(win => !!win.Tribute));

    // activate textarea
    cy.get('.roam-block-container')
      .first()
      .click()
      .clear()

    // interact with textarea which starts tribute flow
    cy.get('.roam-block-container textarea[data-tribute="true"]')
      .first()
      .click()
      .type('jj', {
        delay: 250
      })
      .get('.tribute-container')
      .should('be.visible')

      cy.get('.tribute-container').findByText(/today/i).should('exist')
  })
})
