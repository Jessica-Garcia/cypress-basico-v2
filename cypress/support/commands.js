Cypress.Commands.add('fillRequiredFieldsAndSubmit', () => {
  const longText =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi explicabo possimus consectetur. Dignissimos deserunt sequi, vel iste delectus illo? Tempora voluptas';
  cy.get('#firstName').type('John');
  cy.get('#lastName').type('Doe');
  cy.get('#email').type('John@mail.com');
  cy.get('#open-text-area').type(longText, { delay: 1 });
  cy.contains('button', 'Enviar').click();
});
