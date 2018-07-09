import { catchConsoler, Consoler } from './catcher/consoler';
import { Observable } from 'rxjs';
interface Config {
  network?: boolean;
  consoler?: boolean;
  jserror?: boolean;
};
export class Miner {
  consoler$: Observable<Consoler>

  constructor (configs: Config) {
    const {
      network = false,
      consoler = false,
      jserror = false
    } = configs;

    if (consoler) {
      this.consoler$ = catchConsoler(window);
    }
  }
};