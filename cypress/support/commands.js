// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('input[id="firstName"]')
        .type("Teste")
    cy.get('input[id="lastName"]')
        .type("Cypress")
    cy.get('input[id="email"]')
        .type('test@teste.com')
    cy.get('div textarea[id="open-text-area"]')
        .type('Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis.')
    cy.get('button[class="button"]')
        .contains('Enviar')
        .click()
    cy.successMessage()
})

Cypress.Commands.add('successMessage', () => {
    cy.get('span[class="success"]')
        .should('be.visible')
})

Cypress.Commands.add('erroMessage', () => {
    cy.get('span[class="error"]')
        .should('be.visible')
})