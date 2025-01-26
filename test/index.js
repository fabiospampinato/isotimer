
/* IMPORT */

import {describe} from 'fava';
import {spawnSync} from 'node:child_process';
import * as BrowserTimer from '../dist/browser/index.js';
import * as NodeTimer from '../dist/browser/index.js';

/* HELPERS */

const execScript = script => {
  const args = ['--input-type', 'module', '-e', `"${script}"`];
  const options = { shell: true };
  const result = spawnSync('node', args, options);
  const ouptut = result.stdout.toString ().trim ();
  return ouptut;
};

/* MAIN */

describe ( 'IsoTimer', () => {

  for ( const [name, Timer] of [['Browser', BrowserTimer], ['Node', NodeTimer]] ) {

    describe ( 'immediate', it => {

      it ( `${name} - Can schedule and cancel an immediate`, async t => {

        let calls = '';

        const immediate1 = Timer.setImmediate ( (a, b) => {
          calls += `a${a}${b}`;
        }, 1, 2);

        const immediate2 = Timer.setImmediate ( (a, b) => {
          calls += `b${a}${b}`;
        }, 1, 2);

        Timer.clearImmediate ( immediate2 );

        t.is ( calls, '' );

        await t.wait ( 0 );

        t.is ( calls, 'a12' );

      });

      if ( name === 'Node' ) {

        it.skip ( `${name} - Can unref a immediate`, t => {

          const result = execScript (`
            import {setImmediate, clearImmediate, unrefImmediate, refImmediate} from './dist/node/index.js';
            const immediateId = setImmediate ( () => console.log ( 'HELLO' ) );
            unrefImmediate ( immediateId );
          `);

          t.is ( result, '' );

        });

        it.skip ( `${name} - Can ref a immediate`, t => {

          const result = execScript (`
            import {setImmediate, clearImmediate, unrefImmediate, refImmediate} from './dist/node/index.js';
            const immediateId = setImmediate ( () => console.log ( 'HELLO' ) );
            unrefImmediate ( immediateId );
            refImmediate ( immediateId );
          `);

          t.is ( result, 'HELLO' );

        });

      }

    });

    describe ( 'interval', it => {

      it ( `${name} - Can schedule and cancel an interval`, async t => {

        let calls = '';

        const interval1 = Timer.setInterval ( (a, b) => {
          calls += `a${a}${b}`;
        }, 100, 1, 2);

        const interval2 = Timer.setInterval ( (a, b) => {
          calls += `b${a}${b}`;
        }, 100, 1, 2);

        t.is ( calls, '' );

        await t.wait ( 100 );

        t.is ( calls, 'a12b12' );

        Timer.clearInterval ( interval2 );

        await t.wait ( 100 );

        t.is ( calls, 'a12b12a12' );

        Timer.clearInterval ( interval1 );

      });

      it ( `${name} - Will clamp out of bounds milliseconds`, async t => {

        const intervalId = Timer.setInterval ( t.fail, 50 );

        await t.wait ( 10 );

        Timer.clearInterval ( intervalId );

        t.pass ();

      });

      if ( name === 'Node' ) {

        it ( `${name} - Can unref an interval`, t => {

          const result = execScript (`
            import {setInterval, clearInterval, unrefInterval, refInterval} from './dist/node/index.js';
            const intervalId = setInterval ( () => console.log ( 'HELLO' ), 50 );
            unrefInterval ( intervalId );
          `);

          t.is ( result, '' );

        });

        it ( `${name} - Can ref an interval`, t => {

          const result = execScript (`
            import {setTimeout} from './dist/node/index.js';
            import {setInterval, clearInterval, unrefInterval, refInterval} from './dist/node/index.js';
            const intervalId = setInterval ( () => console.log ( 'HELLO' ), 50 );
            unrefInterval ( intervalId );
            refInterval ( intervalId );
            setTimeout ( () => clearTimeout ( intervalId ), 50 );
          `);

          t.is ( result, 'HELLO' );

        });

      }

    });

    describe ( 'timeout', it => {

      it ( `${name} - Can schedule and cancel a timeout`, async t => {

        let calls = '';

        const timeout1 = Timer.setTimeout ( (a, b) => {
          calls += `a${a}${b}`;
        }, 100, 1, 2);

        const timeout2 = Timer.setTimeout ( (a, b) => {
          calls += `b${a}${b}`;
        }, 100, 1, 2);

        t.is ( calls, '' );

        await t.wait ( 50 );

        t.is ( calls, '' );

        Timer.clearTimeout ( timeout2 );

        await t.wait ( 50 );

        t.is ( calls, 'a12' );

      });

      it ( `${name} - Will clamp out of bounds milliseconds`, async t => {

        const timeoutId = Timer.setTimeout ( t.fail, 50 );

        await t.wait ( 10 );

        Timer.clearTimeout ( timeoutId );

        t.pass ();

      });

      if ( name === 'Node' ) {

        it ( `${name} - Can unref a timeout`, t => {

          const result = execScript (`
            import {setTimeout, clearTimeout, unrefTimeout, refTimeout} from './dist/node/index.js';
            const timeoutId = setTimeout ( () => console.log ( 'HELLO' ), 50 );
            unrefTimeout ( timeoutId );
          `);

          t.is ( result, '' );

        });

        it ( `${name} - Can ref a timeout`, t => {

          const result = execScript (`
            import {setTimeout, clearTimeout, unrefTimeout, refTimeout} from './dist/node/index.js';
            const timeoutId = setTimeout ( () => console.log ( 'HELLO' ), 50 );
            unrefTimeout ( timeoutId );
            refTimeout ( timeoutId );
          `);

          t.is ( result, 'HELLO' );

        });

      }

    });

  }

});
