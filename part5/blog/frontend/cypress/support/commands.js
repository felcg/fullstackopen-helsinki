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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#username')
    .type(username)
  cy.get('#password')
    .type(password)
  cy.get('#login-button')
    .click()
})

Cypress.Commands.add('create', () => {
  cy.contains('Post new blog').click()
  cy.get('#title').type('Test title')
  cy.get('#author').type('Test author')
  cy.get('#url').type('Test url')
  cy.get('#create-button').click()
})
