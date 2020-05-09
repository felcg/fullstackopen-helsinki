describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Felipe',
      username: 'felipe',
      password: 'felipe',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Please login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username')
        .type('felipe')
      cy.get('#password')
        .type('felipe')
      cy.get('#login-button')
        .click()
      cy.get('#logout-button')
        .click()
    })

    it('fails with wrong credentials', () => {
      cy.get('#username')
        .type('felipe2')
      cy.get('#password')
        .type('felipe2')
      cy.get('#login-button')
        .click()
      cy.contains('Wrong credentials')
    })
  })
})
