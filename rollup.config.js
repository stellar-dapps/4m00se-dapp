import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { sveltePreprocess } from 'svelte-preprocess';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import gzipPlugin from 'rollup-plugin-gzip';
import filesize from 'rollup-plugin-filesize';
import strip from '@rollup/plugin-strip';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/widget/init-form-widget.ts',
  output: {
    format: 'iife',
    file: 'dist/widget/4m00s.js',
    sourcemap: false,
    inlineDynamicImports: true
  },
  plugins: [
    commonjs(),
    postcss({
      minimize: true,
      inject: true,
      plugins: [
        atImport({
          path: ['node_modules']
        }),
        autoprefixer()
      ]
    }),
    typescript({
      sourceMap: false,
      inlineSources: false,
      noEmit: true
    }),
    svelte({
      emitCss: false,
      preprocess: sveltePreprocess({
        sourceMap: false,
        postcss: {
          minimize: true,
          plugins: [autoprefixer()]
        }
      }),
      compilerOptions: {
        enableSourcemap: false,
        css: 'injected'
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      extensions: ['.svelte', '.css', '.js', '.ts'],
      mainFields: ['svelte', 'browser', 'module', 'main']
    }),
    terser(),
    gzipPlugin(),
    filesize(),
    strip({
      sourceMap: false
    })
  ]
};
