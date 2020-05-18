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

  describe.only('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'felipe', password: 'felipe' })
    })

    it('A blog can be created', () => {
      cy.contains('Post new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#create-button').click()
      cy.contains('A new blog Test title by Test author was added')
    })

    describe('When a blogs exists', () => {
      beforeEach(() => {
        cy.create('Teste', 'Felipe', 'url')
      })

      it('Can like a blog', () => {
        cy.contains('view more').click()
        cy.contains('like').click()
        cy.get('#likes').contains('1')
      })

      it('Can delete blog if user made it', () => {
        cy.contains('view more').click()
        cy.contains('remove')
      })
    })

    describe('When some blogs exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Teste', author: 'Felipe3', url: 'url', likes: 15,
        })
        cy.createBlog({
          title: 'Teste', author: 'Felipe2', url: 'url', likes: 20,
        })
        cy.createBlog({
          title: 'Teste', author: 'Felipe1', url: 'url', likes: 30,
        })
      })

      it('Sorts the blogs by the ones with most likes first', () => {
        cy.get('.blogLikes')
          .then((blogLikes) => {
            cy.wrap(blogLikes[0]).should('contain', 30)
            cy.wrap(blogLikes[1]).should('contain', 20)
            cy.wrap(blogLikes[2]).should('contain', 15)
          })
      })
    })
  })
})
