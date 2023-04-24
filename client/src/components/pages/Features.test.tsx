import { describe, it, expect, beforeEach } from 'vitest'; // can use it or test
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Features from './Features';

// 1) ARRANGE unit tests
// 2) ACT like a user would with the component
// 3) EXPECT outcomes after user interacts with component
describe('Features', () => {
  it('renders Features component', () => {
    render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );
    screen.debug();
  });

  // following test ALWAYS FAILS
  it('displays under construction text', () => {
    // No RTL query method can select the onscreen text
    // queryByText returns null, which is defined, and misleads tester into believing the test passes
    const p = screen.getByText(/features under construction/i);
    expect(p).toBeDefined();
  });
});
