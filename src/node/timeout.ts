
/* IMPORT */

import {setTimeout, clearTimeout} from 'node:timers';
import {sanitizeMs} from '../utils';

/* HELPERS */

const cache = new Map<number, NodeJS.Timeout>();

/* MAIN */

const set = <Args extends unknown[]> ( callback: ( ...args: Args ) => void, ms: number = 0, ...args: Args ): number => {

  ms = sanitizeMs ( ms );

  const cb = ( ...args: Args ) => { cache.delete ( id ); callback ( ...args ); };
  const timer = setTimeout ( cb, ms, ...args );
  const id = +timer;

  cache.set ( id, timer );

  return id;

};

const clear = ( id: number ): void => {

  cache.delete ( id );

  clearTimeout ( id );

};

const ref = ( id: number ): void => {

  cache.get ( id )?.ref ();

};

const unref = ( id: number ): void => {

  cache.get ( id )?.unref ();

};

/* EXPORT */

export {set, clear, ref, unref};
