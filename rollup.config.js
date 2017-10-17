import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import * as fs from 'fs';

const license = fs.readFileSync('LICENSE', 'utf8');


export default {
  input: 'src/panels.js',
  output: [
    {
      file: 'dist/panels.cjs.js',
      format: 'cjs',
      banner: '/*!\n' + license + '*/'
    }, {
      file: 'dist/panels.es6.js',
      format: 'es',
      banner: '/*!\n' + license + '*/'
    }, {
      file: 'dist/panels.js',
      format: 'iife',
      name: 'Panels',
      banner: '/*!\n' + license + '*/'
    }
  ],
  plugins: [
    buble(),
    uglify({
      output: {
        comments: function(node, comment) {
          var text = comment.value;
          var type = comment.type;

          if (type == 'comment2') {
            return /^!/i.test(text);
          }
        }
      }
    }, minify)
  ]
};
