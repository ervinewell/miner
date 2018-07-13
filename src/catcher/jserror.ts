/**
 * @module catcher
 * @desc js错误信息捕获
 */
import { Observable } from 'rxjs';
import ee from '../core/ee';
import { INNER_CONSOLE_TAG } from '../constants';

export interface Jserror {
  msg: string,
  url: string,
  line: number,
  column: number,
  error: string
}

/**
 * 拦截控制台信息
 */
export function catchJserror (window: Window): Observable<Jserror> {
  const jserror$:Observable<Jserror> = new Observable((observer) => {
    ee.on('jserror', (consoler: Jserror) => {
      observer.next(consoler);
    });
  });
  window.onerror = (
    msg: string,
    url: string,
    line: number,
    column: number,
    err: any
  ) => {
    ee.emit('jserror', {
      type: 'JSError',
      message: {
        msg,
        url,
        line,
        column,
        error: JSON.stringify(err)
      }
    });
  };
  console.log(INNER_CONSOLE_TAG, '已拦截JS报错');
  return jserror$;
};