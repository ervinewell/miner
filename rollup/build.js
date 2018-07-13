const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const ts = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');

(async () => {
  try {
    const bundle = await rollup({
      input: 'src/main.ts',
      plugins: [
        resolve({
          browser: true
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
    await bundle.write({
      file: 'lib/miner.js',
      name: 'miner',
      format: 'umd'
    });
  } catch (err) {
    console.log('error occured: ', err.message);
  }
})();