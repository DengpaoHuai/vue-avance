// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker-js/guides/vuejs",
  packageManager: 'pnpm', // Spécifie que pnpm est utilisé comme gestionnaire de paquets
  testRunner: 'vitest', // Définit Vitest comme test runner
  reporters: ['progress', 'clear-text', 'html'], // Rapports générés
  plugins: [
    '@stryker-mutator/vitest-runner', // Plugin pour le test runner Vitest
  ],
};

export default config;
