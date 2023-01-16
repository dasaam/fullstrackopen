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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()      
      cy.get('#title').type('title by cypress')      
      cy.get('#author').type('author by cypress')      
      cy.get('#url').type('a blog url created by cypress')      
      cy.get('#create-button').click()      

      cy.get('.success')
      .should('contain', 'a new blog title by cypress by author by cypress added')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid') 
    })

    it('a user press like button', function() {

      cy.contains('new note').click()      
      cy.get('#title').type('title by cypress')      
      cy.get('#author').type('author by cypress')      
      cy.get('#url').type('a blog url created by cypress')      
      cy.get('#create-button').click()   
      
      cy.contains('view').click() 
      cy.get('#like-button').click()  

    })

    it('a user remove blogs', function() {

      cy.contains('new note').click()      
      cy.get('#title').type('title by cypress')      
      cy.get('#author').type('author by cypress')      
      cy.get('#url').type('a blog url created by cypress')      
      cy.get('#create-button').click()   
      
      cy.contains('view').click() 
      cy.contains('remove').click()      
    })
  })
})