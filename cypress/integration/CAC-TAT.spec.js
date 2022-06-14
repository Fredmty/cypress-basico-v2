/// <reference types="Cypress" />

describe('Central de Atentimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })
    
    it('verifica o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });
    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Frederico');
        cy.get('#lastName').type('Thofehrn');
        cy.get('#email').type('frederico@email.com');
        cy.get('#open-text-area').type('teste', {delay: 0});
        cy.contains('button', 'Enviar').click();
        
        cy.get('.success').should('be.visible');
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Frederico');
        cy.get('#lastName').type('Thofehrn');
        cy.get('#email').type('frederico@email,com');
        cy.get('#open-text-area').type('teste', {delay: 0});
        cy.contains('button', 'Enviar').click();
        
        cy.get('.error').should('be.visible');
    });
    it('campo telefone continua vazio quando preenchido com valor não numérico ', () => {
        cy.get('#phone')
        .type('aslkdjalskjdalkjd')
        .should('have.value', '');
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
        cy.get('#firstName').type('Frederico');
        cy.get('#lastName').type('Thofehrn');
        cy.get('#email').type('frederico@email.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('teste', {delay: 0});
        cy.contains('button', 'Enviar').click();
        
        cy.get('.error').should('be.visible');
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
        .type('Walmyr')
        .should('have.value', 'Walmyr')
        .clear()
        .should('have.value', '');

        cy.get('#lastName')
        .type('Thofehrn')
        .should('have.value', 'Thofehrn')
        .clear()
        .should('have.value', '');

        cy.get('#email')
        .type('email@email.com')
        .should('have.value', 'email@email.com')
        .clear()
        .should('have.value', '');

        cy.get('#phone')
        .type('123456')
        .should('have.value', '123456')
        .clear()
        .should('have.value', '');
    });
    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');
    });
    it('Seleciona um produto (Youtube)', () => {
        cy.get('#product')
          .select('youtube')
          .should('have.value', 'youtube');
    });
    
    it('Seleciona um produto (mentoria) por seu valor (value', () => {
        cy.get('#product')
           .select('mentoria')
           .should('have.value', 'mentoria')
    });

    it('Selecioa um produto (blog) por seu índice', () => {
        cy.get('#product')
           .select(1)
           .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "feedback" ', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]')
          .should('have.length', 3)
          .each(($radio) => {
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked');
          })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
           .check()
           .should('be.checked')
           .last()
           .uncheck()
           .should('not.be.checked');
    });


  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        console.log($input);
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo e faz drag-and-drop', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(($input) => {
      console.log($input);
      expect($input[0].files[0].name).to.equal('example.json')
  });
  })

  it('seleciona arquivo com alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should(($input) => {
        console.log($input);
        expect($input[0].files[0].name).to.equal('example.json')
  });
  })

  it('abre pagina em outra aba sem necessidade de um clique', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank');
  });

  it('acessa pagina privacidade removendo target e clicando no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click();

      cy.contains('Talking About Testing').should('be.visible');
  });

})