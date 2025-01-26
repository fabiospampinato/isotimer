# IsoTimer

An isomorphic setImmediate/setInterval/setTimeout implementation.

This package exists to smooth out differences between Node and the browser, and to clean up some nonsense.

## Features

- This library works everywhere, with the same API.
- setTimeout/setInterval don't return numbers under Node, this library eliminates that ugliness.
- setImmediate is not natively available in the browser, this library polyfills it.
- setImmediate will also return a number, for consistency.
- .ref/.unref methods are not browser functions, this library exposes dedicated functions for them.
- If the number of milliseconds is too high it would [overflow](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#maximum_delay_value), this library clamps it within the supported range.

## Install

```sh
npm install isotimer
```

## Usage

Very similar APIs are available for setImmediate/setInterval/setTimeout.

The following code will just look at timeouts, for convenience, but they all work the same way basically.

```ts
import {setImmediate, clearImmediate, refImmediate, unrefImmediate} from 'isotimer';
import {setInterval, clearInterval, refInterval, unrefInterval} from 'isotimer';
import {setTimeout, clearTimeout, refTimeout, unrefTimeout} from 'isotimer';

// Let's schedule a timeout, which will always return us a number

const timeoutId = setTimeout ( () => {
  console.log ( 'Hello' );
}, 1000 );

// Let's unref and ref it back again, just to show how to do it

unrefTimeout ( timeoutId );
refTimeout ( timeoutId );

// Let's clear it

clearTimeout ( timeoutId );
```

## License

MIT © Fabio Spampinato
