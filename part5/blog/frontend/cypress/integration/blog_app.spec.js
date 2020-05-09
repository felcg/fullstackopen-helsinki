describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Please login')
  })
})
