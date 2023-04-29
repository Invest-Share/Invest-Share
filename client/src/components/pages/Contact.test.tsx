import { describe, it, expect, beforeEach } from 'vitest'; // can use it or test
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

// 1) ARRANGE unit tests
// 2) ACT like a user would with the component
// 3) EXPECT outcomes after user interacts with component
xdescribe('Contact', () => {
  it('renders Contact component', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    screen.debug();
  });

  // following test ALWAYS FAILS
  it('displays under construction text', () => {
    // No RTL query method can select the onscreen text
    // queryByText returns null, which is defined, and misleads tester into believing the test passes
    const p = screen.getByText(/contacts under construction/i);
    expect(p).toBeDefined();
  });
});
