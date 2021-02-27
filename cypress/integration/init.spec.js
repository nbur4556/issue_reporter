describe('Cypress', () => {
    it('visit issue reporter application', () => {
        cy.visit('/')
    })

    it('is working', () => {
        expect(true).to.equal(true);
    });
});