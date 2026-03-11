import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts', // 或者您的主入口文件
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: false,
      extensions: ['.ts', '.js', '.json', '.mjs']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist'
    })
  ],
  external: [
    'fs',
    'path', 
    'crypto',
    'util',
    'stream',
    'buffer',
  ]
};