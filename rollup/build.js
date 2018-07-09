const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const ts = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

rollup({
  input: 'src/main.ts',
  plugins: [
    resolve(),
    ts(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    })
  ]
}).then((bundle) => {
  return bundle.write({
    file: 'lib/miner.js',
    name: 'miner',
    format: 'umd'
  });
}).catch((err) => {
  console.log('error occured: ', err.message);
});