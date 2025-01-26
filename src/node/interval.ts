
/* IMPORT */

import {setInterval, clearInterval} from 'node:timers';
import {sanitizeMs} from '../utils';

/* HELPERS */

const cache = new Map<number, NodeJS.Timeout>();

/* MAIN */

const set = <Args extends unknown[]> ( callback: ( ...args: Args ) => void, ms: number = 0, ...args: Args ): number => {

  ms = sanitizeMs ( ms );

  const timer = setInterval ( callback, ms, ...args );
  const id = +timer;

  cache.set ( id, timer );

  return id;

};

const clear = ( id: number ): void => {

  cache.delete ( id );

  clearInterval ( id );

};

const ref = ( id: number ): void => {

  cache.get ( id )?.ref ();

};

const unref = ( id: number ): void => {

  cache.get ( id )?.unref ();

};

/* EXPORT */

export {set, clear, ref, unref};
