/// <reference types="Cypress" />

describe('Política de privacidade da Central de Atendimento ao Cliente TAT - Session 8', () => {
    it('Testa a página da política de privavidade de forma independente', ()=>{
        cy.visit('./src/privacy.html')
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})