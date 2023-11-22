import { babel } from '@rollup/plugin-babel';
import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import nodeExternals from 'rollup-plugin-node-externals';

// TODO do I really need all these builds?

function plugins({ minified = true, es5 = false, browser = true }) {
  const arr = [
    typescript({
      rootDir: './src',
      compilerOptions: {
        sourceMap: false,
        declaration: true,
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
  // ESM for browser
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/esm/main.js',
      format: 'es',
      exports: 'named',
    },
    plugins: plugins({ minified: true }),
  },

  // UMD for browser
  {
    input: 'src/main.ts',
    output: {
      name: 'main',
      file: 'dist/umd/main.js',
      format: 'umd',
      exports: 'named',
    },
    plugins: plugins({ minified: true, es5: true }),
  },

  // CJS for browser
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/browser/main.cjs',
      format: 'cjs',
      exports: 'named',
    },
    plugins: plugins({ minified: true, commonJs: true, es5: true }),
  },

  // CJS for node
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/node/main.cjs',
      format: 'cjs',
      exports: 'named',
    },
    plugins: plugins({ minified: true, browser: false, commonJs: true }),
  },
];
