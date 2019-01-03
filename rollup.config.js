// Config
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/main.tsx',
  output: {
    file: 'dist/app.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: [
    'react',
    'react-dom',
  ],
  plugins: [
    typescript(),
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType'],
      },
    }),
    scss({
      output: "dist/app.css",
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
