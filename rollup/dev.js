const { watch } = require('rollup');
const babel = require('rollup-plugin-babel');
const ts = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const serve = require('rollup-plugin-serve');
const cjs = require('rollup-plugin-commonjs');

const watcher = watch({
  input: 'example/index.ts',
  output: {
    file: 'example/example.bundle.js',
    name: 'example',
    format: 'umd'
  },
  watch: {
    chokidar: true,
    include: ['src/**', 'example/**']
  },
  plugins: [
    resolve({
      browser: true
    }),
    serve({
      contentBase: ['example', 'lib'],
    }),
    cjs({
      include: 'node_modules/**'
    }),
    ts(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
});

watcher.on('event', (event) => {
  console.log(event.code);
  if (event.error) {
    console.log(event.error);
  }
});