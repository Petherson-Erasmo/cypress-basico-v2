/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const text = "Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis."

        cy.get('input[id="firstName"]')
            .type("Teste")
        cy.get('input[id="lastName"]')
            .type("Cypress")
        cy.get('input[id="email"]')
            .type('test@teste.com')
        cy.get('div textarea[id="open-text-area"]')
            .type(text, { delay: 0 })
        cy.get('button[class="button"]')
            .contains('Enviar')
            .click()
        cy.successMessage()
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('input[id="firstName"]')
            .type("Teste")
        cy.get('input[id="lastName"]')
            .type("Cypress")
        cy.get('input[id="email"]')
            .type('test@')
        cy.get('div textarea[id="open-text-area"]')
            .type('Isso é um teste de automação usando o Cypress')
        cy.get('button[class="button"]')
            .contains('Enviar')
            .click()
        cy.erroMessage()
    })

    it('Não deveria aceitar caracteres não númericos no campo telefone', () => {
        cy.get('input[id="phone"]')
            .type("Jane")
            .should('not.have.value', 'Jane')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('input[id="firstName"]')
            .type("Teste")
        cy.get('input[id="lastName"]')
            .type("Cypress")
        cy.get('input[id="email"]')
            .type('test@teste.com')
        cy.get('input[id="phone-checkbox"]')
            .check()
        cy.get('div textarea[id="open-text-area"]')
            .type('Isso é um teste de automação usando o Cypress')
        cy.get('button[class="button"]')
            .contains('Enviar')
            .click()
        cy.erroMessage()
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[id="firstName"]')
            .type("Teste")
            .clear()
            .should('have.value', '')
        cy.get('input[id="lastName"]')
            .type("Cypress")
            .clear()
            .should('have.value', '')
        cy.get('input[id="email"]')
            .type('test@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('div textarea[id="open-text-area"]')
            .type('Isso é um teste de automação usando o Cypress')
            .clear()
            .should('have.value', '')
        cy.get('button[class="button"]')
            .contains('Enviar')
            .click()
        cy.erroMessage()
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[class="button"]')
            .contains('Enviar')
            .click()
        cy.get('span[class="error"]')
            .should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Substitui o get por contains', () => {
        const text = "Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis."

        cy.get('input[id="firstName"]')
            .type("Teste")
        cy.get('input[id="lastName"]')
            .type("Cypress")
        cy.get('input[id="email"]')
            .type('test@teste.com')
        cy.get('div textarea[id="open-text-area"]')
            .type(text, { delay: 0 })
        cy.contains('button', 'Enviar')
            .click()
        cy.successMessage()
    })

})

describe.only('Central de Atendimento ao Cliente TAT - Sessão 4', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select[id="product"]')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('select[id="product"]')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('select[id="product"]')
            .select(1)
            .should('have.value', 'blog')
    })
})