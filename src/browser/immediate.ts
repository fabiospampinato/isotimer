
/* IMPORT */

import {setImmediate, clearImmediate} from 'immediato';

/* MAIN */

const set = <Args extends unknown[]> ( callback: ( ...args: Args ) => void, ...args: Args ): number => {

  return setImmediate ( callback, ...args );

};

const clear = ( id: number ): void => {

  clearImmediate ( id );

};

const ref = ( id: number ): void => {};

const unref = ( id: number ): void => {};

/* EXPORT */

export {set, clear, ref, unref};
