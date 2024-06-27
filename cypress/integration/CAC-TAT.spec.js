/// <reference types="Cypress" />

describe('TAT Customer Service Center', function () {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('checks the application title', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('fills the required fields and submits the form', function () {
    const longText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi explicabo possimus consectetur. Dignissimos deserunt sequi, vel iste delectus illo? Tempora voluptas sequi similique, modi illum ea voluptate pariatur aliquam?';
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('John@mail.com');
    cy.get('#open-text-area').type(longText, { delay: 1 });
    cy.get('button[type="submit"]').click();

    cy.get('.success').should('be.visible');
  });

  it('displays an error message when submitting the form with an invalid email format', function () {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('John.mail.com');
    cy.get('#open-text-area').type('this is a test message');
    cy.get('button[type="submit"]').click();

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
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });
});
