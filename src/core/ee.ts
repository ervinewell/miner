// import { EventEmitter2 } from 'eventemitter2';

// const ee = new EventEmitter2();
export default {
  emit (type: string, msg: any) {
    console.log(type, msg);
  },
  on (type: string, msg: any) {
    console.log('on', type, msg);
  }
};