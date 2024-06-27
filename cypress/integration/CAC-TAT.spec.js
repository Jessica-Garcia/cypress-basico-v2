/// <reference types="Cypress" />

describe('TAT Customer Service Center', function () {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('checks the application title', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  //Finding, Typing, Clicking on Elements

  it('fills the required fields and submits the form', function () {
    cy.fillRequiredFieldsAndSubmit(); //custom command

    cy.get('.success').should('be.visible');
  });

  it('displays an error message when submitting the form with an invalid email format', function () {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('John.mail.com');
    cy.get('#open-text-area').type('this is a test message');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('keeps the phone field empty if a non-numeric value is entered', function () {
    cy.get('#phone').type('abchhhhh').should('have.value', '');
  });

  it('displays an error message when the phone number becomes required but is not filled in before submitting the form', function () {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('John@mail.com');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('this is a test message');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  //SELECT

  it('selects a product (YouTube) by its text', function () {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('selects a product (Mentoria) by its value', function () {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('selects a product (Blog) by its index', function () {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  //RADIO BUTTONS

  it('marks service feedback', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  });

  it('marks each type of service', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check().should('be.checked');
      });
  });

  //CHECKBOX check and uncheck

  it.only('check two checkboxes, then uncheck the last one', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked');
  });
});
