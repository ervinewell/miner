import { Miner } from '../src/main';
import { Observable } from '../node_modules/rxjs';

interface Consoler {
  tag?: string;
  msg: string;
}

const miner = new Miner({
  consoler: true
});

const $app = document.getElementById('app');
miner.consoler$.subscribe(item => {
  $app.innerHTML += `${item.tag}: ${item.msg}<br />`;
})