describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {      
      name: 'Superuser',      
      username: 'root',      
      password: 'salainen'    
    }    
    
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
    cy.contains('login')
  })

  describe.only('Login', function() {
    
    it('succeeds with correct credentials', function() {
      
      cy.get('#username').type('root')    
      cy.get('#password').type('salainen')    
      cy.get('#login-button').click()
      
      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')    
      cy.get('#password').type('corn')    
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })
})