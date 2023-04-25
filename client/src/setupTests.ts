// the following runs before any tests run
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers'; // jest-dom tests DOM state; it offers custom jest matchers that extend jest and make tests more declarative (i.e. less redundant) and more maintainable

// extends Vitest's expect method with methods available on jest-dom testing library
expect.extend(matchers);

// clears jsdom after running each test case (specified by 'it')
afterEach(() => {
  cleanup();
});
