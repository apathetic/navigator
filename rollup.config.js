import buble from 'rollup-plugin-buble';
import * as fs from 'fs';

const license = fs.readFileSync('LICENSE', 'utf8');


export default {
  input: 'src/panels.js',
  output: [
    {
      file: 'dist/panels.cjs.js',
      format: 'cjs',
      banner: '/*\n' + license + '*/',
      plugins: [
        buble()
      ]
    }, {
      file: 'dist/panels.es6.js',
      format: 'es',
      banner: '/*\n' + license + '*/',
      plugins: [
        buble()
      ]
    }, {
      file: 'dist/panels.js',
      format: 'iife',
      name: 'Panels',
      banner: '/*\n' + license + '*/',
      plugins: [
        buble()
      ]
    }
  ]
};
