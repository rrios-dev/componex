/* eslint-disable */
require('@testing-library/jest-dom');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Extend expect matchers
expect.extend({
    toHaveClass(received, ...expected) {
        const pass = expected.every(className => received.classList.contains(className));
        return {
            message: () =>
                `expected ${received} ${pass ? 'not ' : ''}to have class ${expected.join(', ')}`,
            pass,
        };
    },
}); 