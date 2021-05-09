describe("Issues", () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit('/workbench');
        });
    });

    it('Select Issue', () => {
        console.log('select issue');
    });
});