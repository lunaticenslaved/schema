import { babel } from '@rollup/plugin-babel';
import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import nodeExternals from 'rollup-plugin-node-externals';

function plugins({ minified = true, es5 = false, browser = true, types = false }) {
  const arr = [
    typescript({
      rootDir: './src',
      compilerOptions: {
        sourceMap: false,
        declaration: types,
        declarationMap: false,
      },
    }),
    commonJS(),
    json(),
  ];

  if (minified) {
    // arr.push(terser());
    // arr.push(bundleSize());
  }

  if (es5) {
    arr.push(
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-core', '@babel/preset-env'],
      }),
    );
  }

  arr.push(nodeExternals());
  arr.push(resolve({ browser }));

  return arr;
}

export default [
  // ESM
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/esm/main.js',
      format: 'es',
      exports: 'named',
    },
    plugins: plugins({ minified: true }),
  },

  // Types
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/types/main.js',
    },
    plugins: plugins({ types: true }),
  },

  // CJS
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/cjs/main.cjs',
      format: 'cjs',
      exports: 'named',
    },
    plugins: plugins({ minified: true, commonJs: true, es5: true }),
  },
];
