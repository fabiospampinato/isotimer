
/* IMPORT */

import {sanitizeMs} from '../utils';

/* HELPERS */

const {setInterval, clearInterval} = globalThis;

/* MAIN */

const set = <Args extends unknown[]> ( callback: ( ...args: Args ) => void, ms: number = 0, ...args: Args ): number => {

  ms = sanitizeMs ( ms );

  const timer = setInterval ( callback, ms, ...args );

  return +timer;

};

const clear = ( id: number ): void => {

  clearInterval ( id );

};

const ref = ( id: number ): void => {};

const unref = ( id: number ): void => {};

/* EXPORT */

export {set, clear, ref, unref};
