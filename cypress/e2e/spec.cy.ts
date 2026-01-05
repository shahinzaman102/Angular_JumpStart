describe('App E2E Test', () => {
  it('should load the app', () => {
    cy.visit('/')
    cy.get('app-root').should('exist')
  })
})
