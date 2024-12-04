import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // Abilita funzioni globali come `describe` e `it`
        environment: 'node', // Ambiente Node.js
    },
});
