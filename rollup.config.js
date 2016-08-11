import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/panels.js',
  moduleName: 'Panels',
  plugins: [
    buble()
  ],

  targets: [
    { dest: 'dist/panels.cjs.js', format: 'cjs' },
    { dest: 'dist/panels.es6.js', format: 'es' },
    { dest: 'dist/panels.browser.js', format: 'iife' }
  ]
};
