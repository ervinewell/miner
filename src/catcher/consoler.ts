/**
 * @module catcher
 * @desc 控制台信息捕获
 */
import { Observable } from 'rxjs';
import ee from '../core/ee';
import { INNER_CONSOLE_TAG } from '../constants';

export interface Consoler {
  tag?: string;
  msg: string;
}

/**
 * 拦截控制台信息
 */
export function catchConsoler (window: Window): Observable<Consoler> {
  const { console: Console } = window;
  const { log, time, timeEnd, error, warn } = console;

  const consoler$:Observable<Consoler> = new Observable((observer) => {
    ee.on('consoler', (consoler: Consoler) => {
      observer.next(consoler); // 输出值
    });
  });

  console.log = (...args): void => {
    if (args[0] !== INNER_CONSOLE_TAG) { // 不监听内部打印信息
      ee.emit('consoler', {
        tag: 'log',
        msg: [].slice.call(args)
      });
    }
    log.call(this, ...args);
  }
  console.error = (...args): void => {
    ee.emit('consoler', {
      tag: 'error',
      message: [].slice.call(args)
    });
    error.call(this, ...args);
  };
  console.warn = (...args): void => {
    ee.emit('consoler', {
      tag: 'warn',
      message: [].slice.call(args)
    });
    warn.call(this, ...args);
  };
  
  const timerMap = {};
  console.time = (id = 'default'): void => {
    timerMap[id] = Date.now();
    ee.emit('consoler', {
      tag: 'time',
      message: [`timer-${id} start...`]
    });
    time.call(this, id);
  };
  console.timeEnd = (id = 'default'): void => {
    const now = Date.now();
    if (id in timerMap) {
      ee.emit('consoler', {
        tag: 'timeEnd',
        message: [`timer-${id} end: ${now - timerMap[id]}ms`]
      });
      delete timerMap[id];
    } else {
      ee.emit('consoler', {
        tag: 'error',
        message: [`timer-${id}不存在`]
      });
    }
    timeEnd.call(this, id);
  };
  console.log(INNER_CONSOLE_TAG, '已拦截控制台信息');
  return consoler$;
};