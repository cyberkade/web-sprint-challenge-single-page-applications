describe('Load Page', () => {
    it('loads pizza page succesfully', () => {
        cy.visit('http://localhost:3000/pizza')
    })
})

describe('Submit Form', () => {
    it('button is disabled because form isnt validated', () => {
        cy.get('#order-button').should('be.disabled')
        
    })
})

describe('Input Box', () => {
    it('lets user type their name into input', () => {
        cy.get('input[name=name]').should('have.value', '').type('Nunu').should('have.value', 'Nunu')
    })
})

describe('Size Dropdown', () => {
    it('lets user select size', () => {
        cy.get('select[name=size]').should('have.value', '--pick a size--').select('Jumbo').should('have.value', 'Jumbo')
    })
})

describe('Topping Selection', () => {
    it('lets user select multiple toppings', () => {
        cy.get('input[name=topping1]').should('be.visible').and('not.be.checked').check()
        cy.get('input[name=topping2]').should('be.visible').and('not.be.checked').check()
        cy.get('input[name=topping3]').should('be.visible').and('not.be.checked').check()
        cy.get('input[name=topping4]').should('be.visible').and('not.be.checked').check()
    })
})

describe('Special Instructions', () => {
    it('lets user type special instructions', () => {
        cy.get('input[name=special]').should('have.value', '').type('Gluten-free pizza please!').should('have.value', 'Gluten-free pizza please!')
    })
})

describe('Submit Form', () => {
    it('lets user submit their pizza order', () => {
        cy.get('#order-button').should('not.be.disabled').click()
        
    })
})

describe('Check for cleared form after submission', () => {
    it('clears the form after user submits', () => {
        cy.get('input[name=name]').should('have.value', '')
        cy.get('select[name=size]').should('have.value', '--pick a size--')
        cy.get('input[name=topping1]').should('be.visible').and('not.be.checked')
        cy.get('input[name=topping2]').should('be.visible').and('not.be.checked')
        cy.get('input[name=topping3]').should('be.visible').and('not.be.checked')
        cy.get('input[name=topping4]').should('be.visible').and('not.be.checked')
        cy.get('input[name=special]').should('have.value', '')

    })
})
