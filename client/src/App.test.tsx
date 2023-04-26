import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// 1) ARRANGE unit tests
// 2) ACT like a user would with the component
// 3) EXPECT outcomes after user interacts with component

xdescribe('App', () => {
  it('renders App component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    screen.debug();
  });

  // following tests are not necessary, since this is not a FE feature user sees / interacts with
  // test('localStorage user matches user in state', () => {});
  // test('localStorate user is empty if on http://localhost:3000/')
  // test('localStorate user is NOT empty if on http://localhost:3000/home')

  // no route testing, since React Router docs say they test routes sufficiently

  // CONCLUSION: for App, doing E2E test with Cypress should suffice
});
