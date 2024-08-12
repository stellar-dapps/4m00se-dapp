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

export default {
  input: 'src/widget/init-form-widget.ts',
  output: {
    format: 'iife',
    file: 'dist/widget/4m00s.js',
    sourcemap: false
  },
  plugins: [
    typescript({
      sourceMap: false,
      inlineSources: false
    }),
    svelte({
      emitCss: false,
      preprocess: sveltePreprocess({
        sourceMap: false,
        postcss: {
          minimize: true,
          plugins: [atImport(), autoprefixer()]
        }
      }),
      compilerOptions: {
        enableSourcemap: false
      }
    }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    terser(),
    gzipPlugin(),
    filesize(),
    strip({
      sourceMap: false
    })
  ]
};
