/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT - Seção 3', () => {

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

describe('Central de Atendimento ao Cliente TAT - Seção 4', () => {

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

describe('Central de Atendimento ao Cliente TAT - Seção 5', () => {

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })
    })

})

describe('Central de Atendimento ao Cliente TAT - Seção 6', () => {
    
    it('Marca ambos checkboxes, depois desmarca o último', ()=>{
        cy.get('input[type="checkbox"]')
            .as('checkboxes')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
})

describe('Central de Atendimento ao Cliente TAT - Seção 7', () => {
    
    it('Seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('input[id="file-upload"]')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    
    it('Seleciona um arquivo simulando um drag-and-drop', ()=>{
        cy.get('input[id="file-upload"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('example.json').as('sampleFile')
        
        cy.get('input[id="file-upload"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
})

describe('Central de Atendimento ao Cliente TAT - Seção 8', () => {
   
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('div[id="privacy"] a')
            .should('have.attr', 'target', '_blank')
    })
    
    it('Acessa a página da política de privacidade removendo o target e então clicanco no link', ()=>{
        cy.get('div[id="privacy"] a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
})

describe('Central de Atendimento ao Cliente TAT - Seção 12', () => {
    
    it('Para o tempo, pereenche os campos obrigatórios, envia o formulário e avança no tempo', ()=> {
        const text = "Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis."
        cy.clock()

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
        cy.get('span[class="success"]')
            .should('be.visible')
        cy.tick(3000)
        cy.get('span[class="success"]')
         .should('not.be.visible')
    })

    Cypress._.times(3, function(){
        it('Executa o mesmo testes algumas vezes para provar que ele é estável', ()=>{
            cy.fillMandatoryFieldsAndSubmit()
        })
    })

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke()', ()=> {
        cy.get('span[class="success"]')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('span[class="error"]')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('Preenche a area de texto usando o comando invoke', ()=>{
        const longText = Cypress._.repeat('1234567890', 20)

        cy.get('div textarea[id="open-text-area"]')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it.only('faz uma requisição HTTP', ()=>{
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const {status , statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })
})