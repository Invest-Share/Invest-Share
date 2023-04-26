import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './../../App';
import Register from './Register';

// 1) ARRANGE unit tests
// 2) ACT like a user would with the component
// 3) EXPECT outcomes after user interacts with component

// mocking = creating a fake version of an internal / external service
// Vitest offers helper methods via vi helper
// vi.mock('axios'); (used for Incomplete axios test, see line 99)

xdescribe('Register', () => {
  // beforeEach(() => {
  //   // use Vitest utility to mock login function passed to Register component as a prop
  //   // vi.fn() creates a spy on a function; if callback is not passed, will return undefined when invoked (https://vitest.dev/api/vi.html#vi-fn)
  //   const login = vi.fn();
  //   render(
  //     <MemoryRouter>
  //       <Register login={login} />
  //     </MemoryRouter>
  //   );
  // });

  it('renders Register component', () => {
    // use Vitest utility to spy on (i.e. "mock"?) the login function passed to Register component as a prop
    // vi.fn() creates a spy on a function; if callback is not passed, will return undefined when invoked (https://vitest.dev/api/vi.html#vi-fn)
    const login = vi.fn();
    render(
      <MemoryRouter>
        <Register login={login} />
      </MemoryRouter>
    );
    screen.debug();
  });

  it('displays the heading "Sign Up"', () => {
    const login = vi.fn();
    render(
      <MemoryRouter>
        <Register login={login} />
      </MemoryRouter>
    );
    const title = screen.getByRole('heading', {
      level: 5,
    });
    expect(title).toHaveTextContent(/sign up/i);
  });

  it('displays a form with 4 required fields, a button, and a link', () => {
    const login = vi.fn();
    render(
      <MemoryRouter>
        <Register login={login} />
      </MemoryRouter>
    );

    // displays a form element. TEST FAILS b/c form is not an accessible role (not sure why, since the docs have form: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/form_role); might be because the form HTML element lacks role="form" attr in the DOM.
    // const registerForm = screen.getByRole('form');
    // expect(registerForm).toBeDefined();

    // form has 4 inputs
    const formInputs = screen.queryAllByRole('textbox'); // array of 3 objects (password field is of type "password", which is not a role)
    expect(formInputs).toHaveLength(3);
    const pwInput = screen.getByLabelText(/password/i);
    expect(pwInput).toBeDefined();

    // all inputs are reqd
    formInputs.every((input) => {
      expect(input).toBeRequired();
    });
    expect(pwInput).toBeRequired();

    // all are text inputs
    formInputs.every((input) => {
      expect(input).toHaveAttribute('type', 'text');
    });
    expect(pwInput).toHaveAttribute('type', 'password');

    // form has a Sign Up button
    const formButton = screen.getByRole('button', { name: /sign up/i });
    expect(formButton).toBeDefined();

    // form has a "Already have an account? Log in" link
    const formLink = screen.getByRole('link');
    expect(formLink).toHaveTextContent('Already have an account? Log in');
  });
});

// 4 INCOMPLETE INTEGRATION TESTS FOR SUBMITTING REGISTRATION FORM
// essentially can't test anything b/c user click event is not simulated using Vitest

// test axios request, referred to https://www.robinwieruch.de/react-testing-library/
// test('successful user registration', async () => {
//   const login = vi.fn();
//   // create dummy user data returned from DB (will be immediately resolved)
//   const response = {
//     data: {
//       id: 94,
//       firstName: 'K',
//       lastName: 'S',
//       email: 'Ks@cs.com',
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImlhdCI6MTY4MjQ2Mjc2OH0.GR8ib6K6-AssRnEi3d75UkcRQIBFsVVGYwJlwNjirV8',
//     },
//   };
//   // mimic post request
//   axios.post.mockImplementationOnce(() => {
//     Promise.resolve(response.data);
//   });
//   render(
//     <MemoryRouter>
//       <Register login={login} />
//     </MemoryRouter>
//   );
//   const submitBtn = screen.getByRole('button');
//   await userEvent.click(submitBtn);
//   // user is on Dashboard page (consequence of updating success in state)
//   const sidenavbarBtns = screen.queryAllByRole('button');
//   expect(sidenavbarBtns).toHaveLength(3);
//   // (SKIP b/c user doesn't know this) localStorage is updated with user's info (consequence of login)
// });

// // Referred to https://kentcdodds.com/blog/avoid-nesting-when-youre-testing#inline-it
// test('clicking "Sign Up" with all valid form info filled calls login', () => {
//   // login is passed down as a prop from App component
//   const login = vi.fn();
//   // invoke userEvent.setup before rendering component (see https://testing-library.com/docs/user-event/intro)
//   // const user = userEvent.setup();
//   const { getByLabelText } = render(
//     <MemoryRouter>
//       <Register login={login} />
//     </MemoryRouter>
//   );
//   // simulate user interactions (typing into fields and clicking Sign Up button)
//   const user = {
//     firstName: 'U',
//     lastName: 'N',
//     email: 'un@cs.com',
//     password: 'abc987',
//   };
//   userEvent.type(getByLabelText(/first name/i), user.firstName);
//   userEvent.type(getByLabelText(/last name/i), user.lastName);
//   userEvent.type(getByLabelText(/email address/i), user.email);
//   userEvent.type(getByLabelText(/password/i), user.password);
//   const formButton = screen.getByRole('button', { name: /sign up/i });
//   userEvent.click(formButton);
//   // assertions
//   expect(login).toHaveBeenCalled();
//   expect(login).toHaveBeenCalledWith(user);
// });

// // Referred to https://kentcdodds.com/blog/avoid-nesting-when-youre-testing#inline-it
// it('clicking "Sign Up" with invalid form info (i.e. existing user's email) filled displays "Registration Failed"', () => {
//   // login is passed down as a prop from App component
//   const login = vi.fn();
//   const { getByLabelText, getByRole } = render(
//     <MemoryRouter>
//       <Register login={login} />
//     </MemoryRouter>
//   );
//   // simulate user interactions (typing into fields and clicking Sign Up button)
//   const user = {
//     firstName: 'U',
//     lastName: 'N',
//     email: 'un@cs.com',
//     password: 'abc987',
//   };
//   userEvent.type(getByLabelText(/first name/i), user.firstName);
//   userEvent.type(getByLabelText(/last name/i), user.lastName);
//   userEvent.type(getByLabelText(/email address/i), user.email);
//   userEvent.type(getByLabelText(/password/i), user.password);
//   const formButton = screen.getByRole('button', { name: /sign up/i });
//   userEvent.click(formButton);
//   // assertions
//   const warning = getByRole('alert');
//   expect(warning).toHaveTextContent(/please fill out this field/i);
//   expect(login).not.toHaveBeenCalled();
// });

// // Referred to https://v5.reactrouter.com/web/guides/testing/navigating, https://testing-library.com/docs/example-react-router/
// test('clicking link navigates to Login page', async () => {
//   // login is passed down as a prop from App component
//   const login = vi.fn();
//   render(<App />, { wrapper: BrowserRouter });
//   // invoke userEvent.setup before rendering component (see https://testing-library.com/docs/user-event/intro)
//   const user = userEvent.setup();
//   // assertions
//   // MISSING CODE HERE TO NAVIGATE FROM APP TO REGISTER PAGE (grab Register button, await user click)
//   // verify user is on Register page
//   expect(
//     screen.getByRole('heading', {
//       level: 5,
//     })
//   ).toHaveTextContent(/sign up/i);
//   // click link
//   const formLink = screen.getByRole('link');
//   await user.click(formLink);
//   // verify user is on Login page
//   expect(
//     screen.getByRole('heading', {
//       level: 5,
//     })
//   ).toHaveTextContent(/login/i);
// });
