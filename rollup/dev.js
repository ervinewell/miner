const { watch } = require('rollup');
const babel = require('rollup-plugin-babel');
const ts = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const serve = require('rollup-plugin-serve');

const watcher = watch({
  input: 'src/main.ts',
  output: {
    file: 'lib/miner.js',
    name: 'miner',
    format: 'umd'
  },
  watch: {
    chokidar: true,
    include: 'src/**'
  },
  plugins: [
    serve({
      contentBase: ['example', 'lib'],
    }),
    resolve(),
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