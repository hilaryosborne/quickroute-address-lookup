import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|mjs)$": [
      "ts-jest",
      {
        tsconfig: {
          allowJs: true,
          checkJs: false,
        },
      },
    ],
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.test.ts"],
  // coverage configuration
  collectCoverage: false,
  coverageDirectory: ".coverage",
  transformIgnorePatterns: ["node_modules/(?!(msw|@mswjs|@bundled-es-modules|until-async|uuid)/)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.ts",
    "!src/__stubs__/**",
    "!src/__mocks__/**",
    "!src/**/__tests__/**",
    "!src/index.ts",
    "!src/**/index.ts",
  ],
  // @TODO enable coverage reports displayed on PR page
  coverageReporters: ["text", "text-summary", "json", "json-summary"],
};
