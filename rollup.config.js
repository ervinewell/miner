const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const ts = require('rollup-plugin-typescript2');

rollup({
  input: 'main.ts',
  plugins: [
    ts(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
  ]
}).then((bundle) => {
  return bundle.write({
    file: 'miner.js',
    name: 'miner',
    format: 'umd'
  });
}).catch((err) => {
  console.log(err.message);
});