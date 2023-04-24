import { describe, it, expect } from 'vitest'; // can use it or test
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

// 1) ARRANGE unit tests
// 2) ACT like a user would with the component
// 3) EXPECT outcomes after user interacts with component
describe('Home', () => {
  it('renders Home component', () => {
    // RTL's render takes any JSX arg, renders as output to VDOM
    // ISSUE: you can pass invalid paths to Home and test still passes
    render(
      <MemoryRouter initialEntries={['/', '/home']}>
        <Home />
      </MemoryRouter>
    );
    // RTL's debug method exposed from screen object prints the DOM state
    // defaults to printing root node
    // shows the DOM tree that is visible to RTL's renderer in the test
    // end user sees / interacts with rendered HTML from your React components, so that's why you see this HTML structure as output rather than two React components
    screen.debug();
  });

  it('renders HeroSection child component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const welcomeText = screen.getByRole('heading', {
      level: 1, // aria-level, i.e. h1 tag
    });
    expect(welcomeText).toHaveTextContent('Welcome to InvestShare');
  });

  it('renders Footer child component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const twitterIcon = screen.getByTestId('TwitterIcon'); // array of 3 icon elements
    expect(twitterIcon).toBeDefined();
  });
});
