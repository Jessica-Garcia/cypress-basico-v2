/// <reference types="Cypress" />

describe('TAT Customer Service Center', function () {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('checks the application title', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('fills the required fields and submits the form', function () {
    cy.fillRequiredFieldsAndSubmit();
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
    cy.get('#phone-checkbox').click();
    cy.get('#open-text-area').type('this is a test message');
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });
});
