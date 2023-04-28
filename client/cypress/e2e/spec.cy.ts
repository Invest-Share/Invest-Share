describe('App', () => {
  // it('successfully loads', () => {
  //   cy.visit('http://localhost:3000');
  // });

  // it('successfully registers new user', () => {
  //   cy.visit('http://localhost:3000/register');
  //   cy.get('form').within(() => {
  //     cy.get('input[name=firstName]').type('Indecisive');
  //     cy.get('input[name=lastName]').type('Investor');
  //     cy.get('input[name=email]').type('II@cs.com');
  //     cy.get('input[name=password]').type('758vie');
  //     cy.get('button').click();
  //   });
  // });

  it('successfully logs in user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('form').within(() => {
      cy.get('input[name=email]').type('upnata@gmail.com');
      cy.get('input[name=password]').type('fiona!94');
      cy.get('button').click();
    });
    cy.get('.css-1o7ozsq-MuiTypography-root').should(
      'have.text',
      'Hello Upasana! '
    );
    cy.get('div[role=button]').filter(':contains("My Profile")').click();
    //Purchase stock
    cy.get('input[name=ticker]').type('MSFT');
    cy.get('input[name=stock_quantity]').type('0');
    cy.get('button').filter(':contains("BUY")').click();
    cy.get('tr')
      .filter(':contains("MSFT")')
      .within(() => {
        cy.get('td').filter(':contains("5")').should('be.visible');
      });
    //Sell stock
    cy.get('input[name=ticker]').type('MSFT');
    cy.get('input[name=stock_quantity]').type('5');
    cy.get('button').filter(':contains("SELL")').click();
    //Throws error if you oversell
    cy.get('input[name=ticker]').type('MSFT');
    cy.get('input[name=stock_quantity]').type('99');
    cy.get('button').filter(':contains("SELL")').click();
  });

  // it(('', ()={}));
  //Login
  //Dashboard
  //Add New Stock
  //Buy Stock
  // buy 3 different stocks, and check if added
  //Sell Stock (in order)
  // oversell -> error
  // sell less than you own
  // sell all you own
  // If you sell 1 does it deduct
  // If you sell all are they gone
  // Throws error if you oversell
});
