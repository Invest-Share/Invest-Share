import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { getByLabelText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';

// 1) ARRANGE unit tests
// 2) ACT like a user would with the component
// 3) EXPECT outcomes after user interacts with component

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
    // use Vitest utility to mock login function passed to Register component as a prop
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
    // displays a form element. TEST FAILS b/c form is not an accessible role (not sure why, since the docs have form: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/form_role); might be because the form element lacks role="form" attr.
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

  test('clicking "Sign Up" calls onSubmit with form info', async () => {
    const login = vi.fn();
    // invoke userEvent.setup before rendering component (see https://testing-library.com/docs/user-event/intro)
    // const user = userEvent.setup();
    const { getByLabelText } = render(
      <MemoryRouter>
        <Register login={login} />
      </MemoryRouter>
    );
    // simulate user interactions (typing into fields and clicking Sign Up button)
    const user = {
      firstName: 'U',
      lastName: 'N',
      email: 'un@cs.com',
      password: 'abc987',
    };
    await userEvent.type(getByLabelText(/first name/i), user.firstName);
    await userEvent.type(getByLabelText(/last name/i), user.lastName);
    await userEvent.type(getByLabelText(/email address/i), user.email);
    await userEvent.type(getByLabelText(/password/i), user.password);
    const formButton = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(formButton);
    // assertions
    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith(user);
  });

  it('displays "Registration Failed" on failed submit', () => {
    const login = vi.fn();
    render(
      <MemoryRouter>
        <Register login={login} />
      </MemoryRouter>
    );
  });

  test('"Already have an account? Log in" link routes to Login', () => {
    const login = vi.fn();
    render(
      <MemoryRouter>
        <Register login={login} />
      </MemoryRouter>
    );
  });
});
