
/* IMPORT */

import {setImmediate, clearImmediate} from 'node:timers';

/* HELPERS */

const cache = new Map<number, NodeJS.Immediate>();
let counter = 1;

/* MAIN */

const set = <Args extends unknown[]> ( callback: ( ...args: Args ) => void, ...args: Args ): number => {

  const cb = ( ...args: Args ) => { cache.delete ( id ); callback ( ...args ); };
  const timer = setImmediate ( cb, ...args );
  const id = counter++;

  cache.set ( id, timer );

  return id;

};

const clear = ( id: number ): void => {

  const timer = cache.get ( id );

  if ( !timer ) return;

  cache.delete ( id );

  clearImmediate ( timer );

};

const ref = ( id: number ): void => {

  cache.get ( id )?.ref ();

};

const unref = ( id: number ): void => {

  cache.get ( id )?.unref ();

};

/* EXPORT */

export {set, clear, ref, unref};
