import React from 'react';
import Register from '../../src/components/pages/Register';
import { BrowserRouter } from 'react-router-dom';

describe('Register', () => {
  beforeEach('Register component mounts', () => {
    // when testing a component that uses hook useNavigate, wrap the component with BrowserRouter
    cy.mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
      {
        routerProps: {
          initialEntries: ['/register'],
        },
      }
    );
  });

  it('displays the heading "Sign Up"', () => {
    cy.get('h5').contains(/sign up/i);
  });

  it('displays a form with 4 required fields, a button, and a link', () => {
    cy.get('form').within(() => {
      cy.get('input[required]').should('have.length', 4);
      cy.get('button')
        .invoke('text')
        .should('match', /sign up/i);
      cy.get('a').should('contain', 'Already have an account? Log in');
    });
  });
});
