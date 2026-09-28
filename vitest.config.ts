import { defineConfig } from "vitest/config";
import path from "path";

// Single runner for the unit and integration suites (issue #595).
// Jest previously handled `test:unit` while Vitest handled `test:integration`
// and `test:hooks`; the split was accidental, so everything now runs under
// Vitest. This config covers the node environment (unit + integration);
// component tests keep their own jsdom config in vitest.hooks.config.ts.
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "**/__tests__/**/*.test.[jt]s?(x)",
      "**/__tests__/**/*.comprehensive.test.[jt]s?(x)",
      "**/__tests__/**/*.edge.test.[jt]s?(x)",
      "**/__tests__/**/*.integration.test.[jt]s?(x)",
    ],
    exclude: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "**/*.hooks.test.[jt]s?(x)",
    ],
    coverage: {
      provider: 'v8',
      // Emit a machine-readable report so the Jest and Vitest halves of the
      // suite can be merged into a single figure (issue #597).
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: './coverage/vitest',
      exclude: [
        'node_modules/**',
        '.next/**',
        'coverage/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        // Generated files, stories, and test utilities should not count
        // toward application coverage (issue #597).
        '**/*.stories.[jt]s?(x)',
        '**/*.story.[jt]s?(x)',
        '**/__stories__/**',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/test-utils/**',
        '**/testUtils/**',
        '**/*.test.[jt]s?(x)',
        '**/*.spec.[jt]s?(x)',
        '**/generated/**',
        '**/*.generated.[jt]s?(x)',
      ],
    },
  },
  resolve: {
    alias: [
      { find: "@/data", replacement: path.resolve(__dirname, "./src/data") },
      { find: "@", replacement: path.resolve(__dirname, "./") },
    ],
  },
});
